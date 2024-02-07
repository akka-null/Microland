// FIX: * you are inconsitant wiht your error msg some time ERROR some time Error and the other time error fix it 
import { RequestHandler } from "express";
import { mailOptions, transporter } from "../utils/sendMail";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/userModel";
import { matchedData, validationResult } from "express-validator";

// @desc    user registration
// @path    POST /register
// @access  public
export const register: RequestHandler = async (req, res, next) => {
    const { username, email, password } = matchedData(req);
    // checking the validation errors
    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });

        await user.save();
        // creating a token for confirmation email
        const emailToken = jwt.sign(
            {
                userId: user.id,
            },
            process.env.EMAIL_SECRET!,
            {
                expiresIn: "1d",
            }
        );

        // TODO: work on the emial template
        const url = `http://localhost:3030/email/${emailToken}`;

        mailOptions["to"] = user.email;
        mailOptions.html = `Please click the link to confirm your email: <a href="${url}">${url}</a>`;
        //
        // Send the email
        const info = transporter.sendMail(mailOptions);
        res.send("Email sent successfully, Pleas confirm you account, check your inbox or spams!");
    } catch (error) {
        next(error);
    }
}

// @desc    user email validation
// @path    POST /email
// @access  private
export const Emailvalidation: RequestHandler = async (req, res, next) => {
    try {
        const decoded = jwt.verify(req.params.emailToken!, process.env.EMAIL_SECRET!) as JwtPayload;
        await User.updateOne(
            { _id: decoded.userId },
            { emailConfirmed: true }
        );
        res.status(200).json("your email has been confirmed ");
    } catch (error) {
        next(Error('link is expired!'));
        // next(error); // this will yells "jwt expired"
    }
}

// @desc    user login
// @path    POST /login
// @access  public
export const login: RequestHandler = async (req, res, next) => {
    // matchedDate witll return an object no matter what how many fields you valdiate it will always return and object
    const { email, password } = matchedData(req);
    const errorResult = validationResult(req);

    if (!errorResult.isEmpty()) {
        res.status(400);
        next(Error(errorResult.array()[0]?.msg));
    }
    // checking if a use exist with that email
    try {
        const user = await User.findOne({ email: email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(400);
            next(Error('Email or Password Incorrect'));
        }
        // found user and will check if did manage to confirm his email
        else if (!user.emailConfirmed) {
            res.status(403);
            next(Error('Confirm Your Email Address to login!'));
        }
        else {
            // found a user  create an httpONly cookie
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_TOKEN!, {
                expiresIn: "5m",
            });
            res.cookie("loginCookie", token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV !== "development", // we are in dev so dev !== dev will give false
                // NOTE: * if you don't set the maxAge it will be a session coookie
                maxAge: 1000 * 60 * 5, // ms i want to give it 2 min
            })
                .status(200).json({ msg: "login succesfully!" });
        }
    } catch (error) {
        next(error);
    }
}

// @desc    user login
// @path    POST /login
// @access  public
export const logout: RequestHandler = async (_req, res) => {
    res.clearCookie("loginCookie");
    res.status(200).json({ msg: "logout seccessfull" });
}

// TODO: * rebuild and rethink the forget password feature

export const forgetPass: RequestHandler = async (req, res, next) => {

    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        next(Error(errorResult.array()[0]?.msg));
    }
    const { email } = matchedData(req);
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            // creating a password reset token and sending it thorugh an email
            const passToken = jwt.sign(
                {
                    userId: user.id,
                },
                process.env.EMAIL_SECRET!,
                {
                    expiresIn: "1d",
                }
            );

            // const url = `http://localhost:3030/reset/${passToken}`;
            const url = `${req.hostname}:${process.env.PORT}/reset/${passToken}`;
            mailOptions["to"] = user.email;
            mailOptions.html = `Please click the link to update your password: <a = href="${url}">${url}</a>`;
            //
            // Send the email
            const info = transporter.sendMail(mailOptions);
            res.json({
                msg: `${user.username} please check you email inbox or spams, we sent a password recovery link to you `,
            });
        }
        else {
            res.status(400).json({ message: "We're sorry. We weren't able to identify you" });
        }
    } catch (error) {
        next(error);
    }
}


export const resetPassword: RequestHandler = async (req, res, next) => {
    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const { password } = matchedData(req);
        const hashedPass = await bcrypt.hash(password, 12);
        const decoded = jwt.verify(req.params.passToken!, process.env.EMAIL_SECRET) as JwtPayload;
        const user = await User.findByIdAndUpdate(decoded.userId, { password: hashedPass });
        if (!user) {
            res.status(400);
            return next(Error('User Not Found'));
        }
        res.status(200).json({ msg: "password updated" });

    } catch (error) {
        next(error);
    }
}
