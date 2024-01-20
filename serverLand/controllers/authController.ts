// FIX: * you are inconsitant wiht your error msg some time ERROR some time Error and the other time error fix it 
import { RequestHandler } from "express";
import { mailOptions, transporter } from "../utils/sendMail";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userModel";
import { matchedData, validationResult } from "express-validator";
// @desc    user login
// @path    POST /login
// @access  private
export const akka: RequestHandler = async (req, res) => {
    if (req.user) {
        res
            .status(200)
            .json({ msg: `im portected and you managed to reach me ${req.user}` });
    } else {
        res.status(401).send("Unauthorized");
    }
}
// @desc    user registration
// @path    POST /register
// @access  public
export const register: RequestHandler = async (req, res) => {
    const { username, email, password } = matchedData(req) as { username: string, email: string, password: string };


    // checking the validation errors
    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        return res
            .status(400)
            .json({ ValidationError: "All Fields Required", errorResult }); // 400 bad request
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

        const url = `http://localhost:3030/email/${emailToken}`;

        mailOptions["to"] = user.email;
        mailOptions.html = `Please click the link to confirm your email: <a href="${url}">${url}</a>`;
        //
        // Send the email
        const info = transporter.sendMail(mailOptions);
        res.send("Email sent successfully!");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

// @desc    user email validation
// @path    POST /email
// @access  private
export const Emailvalidation: RequestHandler = async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.emailToken!, process.env.EMAIL_SECRET!) as JwtPayload;
        await User.updateOne(
            { _id: decoded.userId },
            { emailConfirmed: true }
        );
        res.status(200).json("your email has been confirmed ");
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// @desc    user login
// @path    POST /login
// @access  public
export const login: RequestHandler = async (req, res) => {
    // matchedDate witll return an object no matter what how many fields you valdiate it will always return and object
    const { email, password } = matchedData(req);
    const errorResult = validationResult(req);

    if (!errorResult.isEmpty()) {
        return res.status(400).json({ ValidationError: errorResult }); // 400 bad request
    }
    // checking if a use exist with that email
    try {
        const user = await User.findOne({ email: email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Email or Password incorect" });
        }
        // found user and will check if did manage to confirm his email
        if (!user.emailConfirmed) {
            return res
                .status(403)
                .json({ error: "Please confirm your email addresss to login!" });
        }
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
    } catch (error) {
        res.status(500).json({ error: "Something Went Wrong" });
    }
}

// @desc    user login
// @path    POST /login
// @access  public
export const logout: RequestHandler = async (req, res) => {
    if (req.user) {
        res.clearCookie("loginCookie");
        res.status(200).json({ msg: "logout seccessfull" });
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
}

// TODO: * rebuild and rethink the forget password feature

// @desc    user login
// @path    POST /login
// @access  public
export const forgetPass: RequestHandler = async (req, res) => {
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

            const url = `http://localhost:3030/reset/${passToken}`;
            mailOptions["to"] = user.email;
            mailOptions.html = `Please click the link to update your password: <a href="${url}">${url}</a>`;
            //
            // Send the email
            const info = transporter.sendMail(mailOptions);

            res.json({
                msg: `${user.username} please check you email inbox we sent a password recovery link to you `,
            });
        }
    } catch (error) {
        res.json({ error: error });
    }
}

// @desc    user login
// @path    POST /login
// @access  public
export const resetPass: RequestHandler = async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.passToken!, process.env.EMAIL_SECRET) as JwtPayload;
        res.status(200).json({ userId: decoded.userId });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
export const updatePass: RequestHandler = async (req, res) => {
    try {
        // TODO: * await the result then return or not?
        const { password } = matchedData(req);
        const hashedPass = await bcrypt.hash(password, 12);
        // WARN: * which is better finByIdAndUpdate or UpdateOne
        await User.findByIdAndUpdate(req.params.userId, { password: hashedPass });
        res.status(200).json({ msg: "password updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
