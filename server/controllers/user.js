const User = require("../models/userSchema.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const { name, email, password, age, gender, phone, bio } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
        let data = await (new User({
            name,
            email: email,
            password: hashedPassword,
            age,
            gender,
            phone,
            bio
        })).save();

        res.status(201).json({
            message: "User credentials created",
            data: {
                name: data.name,
                email: data.email,
                _id: data._id,
                phone: data.phone,
            }
        });
    } catch (err) {
        res.status(500).json({
            err,
            message: `Internal server error`,
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email please try again with correct email",
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
        }

        if (await bcrypt.compare(password, user.password)) {

            let token = jwt.sign(payload, process.env.JWT_SECRET)

            user.token = token;
            user.password = undefined;


            // cookies
            const option = {
                maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true
            }

            res.cookie("x-auth-token", token, option).status(200).json({
                success: true,
                token, user, message: "User Logged In Successfully"
            })
        }
        else {
            return res.status(403).json({
                success: false,
                message: "Passwords Do not match"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `Internal server error`,
        });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        return res.status(200).json(user)
    } catch (error) {
        res.status(500).send("Server Error");
    }
}

const updateUser = async (req, res) => {
    try {
        const { name, email, age, gender, phone, bio } = req.body;
        const user = await User.findByIdAndUpdate(req.user, {
            $set: {
                name,
                email: email,
                age, gender, phone, bio
            }
        }, { new: true });

        return res.status(200).json({ message: "User Update Successfully", user })
    } catch (error) {
        console.log(error)
        res.status(500).json("Server Error");
    }
}

module.exports = {
    createUser,
    loginUser,
    getUser,
    updateUser
};