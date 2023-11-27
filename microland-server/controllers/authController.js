import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';


// TODO: validation and checking user input
async function signup(req, res) {
    const { username, email, password, confirmPassword } = req.body;

    // checking all fields 
    if (!username || !email || !password || !confirmPassword) {
        res.status(400).json({ "ValidationError": "All Fields Required" }); // 400 bad request
    }
    // check if a user already exist 
    // create a new user
    try {
        // hashing the password
        if (password === confirmPassword) {
            const hashedPassword = await bcrypt.hash(password, 12);

            // // creating a user
            const user = new User({
                username: username,
                email: email,
                password: hashedPassword
            });
            await user.save();
            res.status(200).json({ user });
            // creating a jwt tokens 

        };
    } catch (error) {
        res.status(500).json({ "Error": "Something Went Wrong" });
    } 
};


async function signin(req, res) { };
async function signout(req, res) { };


export default { signin, signup, signout };

