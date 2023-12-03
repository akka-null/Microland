import { mailOptions, transporter } from "../utils/sendMail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { matchedData, validationResult } from "express-validator";

// @desc    user login
// @path    POST /login
// @access  public
async function akka(req, res) {
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
async function register(req, res) {
    // const { username, email, password, confirmPassword } = req.body;
    const { username, email, password } = matchedData(req);

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
            process.env.EMAIL_SECRET,
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
        res.status(500).json({ Error: "Something Went Wrong", error });
    }
}

// @desc    user email validation
// @path    POST /email
// @access  private
async function Emailvalidation(req, res) {
    try {
        const decoded = jwt.verify(req.params.emailToken, process.env.EMAIL_SECRET);
        await User.findOneAndUpdate(
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
async function login(req, res) {
    // WARN: matchedDate witll return an object no matter what how many fields you valdiate it will always return and object
    const { email, password } = matchedData(req);
    const errorResult = validationResult(req);

    if (!errorResult.isEmpty()) {
        return res.status(400).json({ ValidationError: errorResult }); // 400 bad request
    }
    // checking if a use exist with that email
    try {
        const user = await User.findOne({ email: email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ Error: "Email or Password incorect" });
        }
        // found user and will check if did manage to confirm his email
        if (!user.emailConfirmed) {
            return res
                .status(400)
                .json({ error: "Please confirm your email addresss to login!" });
        }
        // found a user  create an httpONly cookie
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_TOKEN, {
            expiresIn: "2m",
        });
        res.cookie("loginCookie", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development", // we are in dev so dev !== dev will give false
            // NOTE: if you don't set the maxAge it will a session coookie
            maxAge: 1000 * 60 * 2, // ms i want to give it 2 min
        });

        res.status(200).json({ msg: "login succesfully!" });
    } catch (error) {
        res.status(500).json({ Error: "Something Went Wrong" });
    }
}

// @desc    user login
// @path    POST /login
// @access  public
async function logout(req, res) {
    if (req.user) {
        res.clearCookie("loginCookie");
        res.status(200).json({ msg: "logout seccessfull" });
    } else {
        res.status(401).send("Unauthorized");
    }
}

// @desc    user login
// @path    POST /login
// @access  public
async function forgetPass(req, res) {
    const { email } = matchedData(req);
    try {
        const user = await User.findOne({ email: email });
        // creating a password reset token and sending it thorugh an email
        const passToken = jwt.sign(
            {
                userId: user.id,
            },
            process.env.EMAIL_SECRET,
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
    } catch (error) {
        res.json({ error: error });
    }
}

// @desc    user login
// @path    POST /login
// @access  public
async function resetPass(req, res) {
    try {
        const decoded = jwt.verify(req.params.passToken, process.env.EMAIL_SECRET);
        res.status(200).json({ userId: decoded.userId });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
async function updatePass(req, res) {
    try {
        // TODO: validate the id and password and confirm password for this route
        const { password } = matchedData(req);
        const hashedPass = await bcrypt.hash(password, 12);
        await User.findByIdAndUpdate(req.params.userId, { password: hashedPass });
        res.status(200).json({ msg: "password updated" });
    } catch (error) {
        res.status(500).json({ error: err });
    }
}
// TODO: validate the input for forget password and rethink the logic of makeing 2 request for password

export default {
    register,
    login,
    logout,
    forgetPass,
    resetPass,
    updatePass,
    Emailvalidation,
    akka,
};
