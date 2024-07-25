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
        return next(Error(errorResult.array()[0]?.msg));
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
        const emailToken = jwt.sign({ userId: user.id, }, process.env.EMAIL_SECRET!, { expiresIn: "1d", });
        // TODO: work on the email template
        const base_url = (process.env.NODE_ENV === "development") ? "http://" + req.hostname + ":" + process.env.PORT : "https://" + req.hostname;
        const url = `${base_url}/email/${emailToken}`;

        mailOptions["to"] = user.email;
        mailOptions.subject = "Email Confirmation";
        mailOptions.html = `Please click the link to confirm your email: <a = href="${url}">${url}</a>`;
        // mailOptions.html = `Please click the link to update your password: <a = href="${url}">${url}</a>`; from the confirmation
        //
        // Send the email
        transporter.sendMail(mailOptions);
        res.json({ msg: "Email sent successfully, Pleas confirm your account, check your inbox or spams!" });
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
        await User.updateOne({ _id: decoded.userId }, { emailVerified: true });

        res.status(200).json("your email has been confirmed ");
    } catch (error) {
        res.status(400);
        next(Error('Invalid or expired token'));
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
        return next(Error(errorResult.array()[0]?.msg));
    }
    // checking if a use exist with that email
    try {
        const user = await User.findOne({ email: email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(400);
            next(Error('Email or Password Incorrect'));
        }
        // found user and will check if did manage to confirm his email
        else if (!user.emailVerified) {
            res.status(403);
            next(Error('Confirm Your Email Address to login!'));
        }
        else {
            // found a user  create an httpONly cookie
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_TOKEN!, {
                expiresIn: "30m",
            });
            res.cookie("loginCookie", token, {
                httpOnly: true,
                sameSite: "strict", // prevent csrf attacks
                secure: process.env.NODE_ENV !== "development",
                // NOTE: * if you don't set the maxAge it will be a session coookie
                maxAge: 1000 * 60 * 30, // ms ==> 30 min
            })
                .status(200).json({ msg: "login succesfully!" });
        }
    } catch (error) {
        next(error);
    }
}

// @desc    user logout
// @path    POST /logout
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
        return next(Error(errorResult.array()[0]?.msg));
    }
    const { email } = matchedData(req);
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            // creating a password reset token and sending it thorugh an email
            const passToken = jwt.sign({ userId: user.id }, process.env.EMAIL_SECRET!, { expiresIn: "3m" });
            const base_url = (process.env.NODE_ENV === "development") ? "http://" + req.hostname + ":" + process.env.PORT : "https://" + req.hostname;
            const url = `${base_url}/reset/${passToken}`;

            mailOptions["to"] = user.email;
            mailOptions.subject = "Password Reset";
            mailOptions.html = `Please click the link to update your password: <a = href="${url}">${url}</a>`;

            // Send the email
             await transporter.sendMail(mailOptions);
            res.json({
                msg: `${user.username} please check you email inbox or spams, we sent a password recovery link to you `,
            });
        }
        else {
            res.status(400)
            next(Error("We're sorry. We weren't able to identify you"));
        }
    } catch (error) {
        next(error);
    }
}


export const resetPassword: RequestHandler = async (req, res, next) => {
    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
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
        res.status(400);
        next(Error('Invalid or expired token'));
    }
}
