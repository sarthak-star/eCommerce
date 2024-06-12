
// REQUIRED IMPORTS

const expressAsyncHandler = require("express-async-handler");
const User = require("../models/usermodel");
const sendToken = require("../utils/jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const { Error } = require("mongoose");
const cloudinary = require("cloudinary");

// ------------------------------------------------------


// REGISTER USER ---- TESTED

exports.registerUser = expressAsyncHandler(
    async (req, res) => {

        const { name, email, password } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: "sample public id",
                url: "sample public url",
            }
        });

        sendToken(user, 201, res);
    }
)

// LOGIN USER ---- TESTED

exports.loginUser = expressAsyncHandler(
    async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(500).json({
                success: false,
                error: "Please provide an Email and Password!"
            })
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            res.status(500).json({
                success: false,
                error: "Invalid Credentials! Please try again."
            })
        }



        const ispasswordmatched = user?.comparePass(password);

        if (!ispasswordmatched) {
            res.status(401).json({
                success: false,
                error: "Incorrect credentials provided!!"
            })
        }

        sendToken(user, 200, res);
    }
)

// LOGOUT USER ---- TESTED

exports.logoutUser = expressAsyncHandler(
    async (req, res, next) => {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })

        res.status(200).json({
            success: true,
            message: "logged out"
        })
    }
)

// FORGOT PASSWORD ---- NOT WORKING

exports.forgotpassword = expressAsyncHandler(
    async (req, res) => {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(404).json({
                sucess: false,
                error: "No account with that email found!"
            })
        }

        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        //create a reset url
        const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

        const message = `Your password reset token is :- \n\n ${resetUrl}`;

        try {

            await sendEmail({
                email: user.email,
                subject: 'Opulence Avenue Password Recovery',
                message,
            })

            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} successfully`
            })

        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            res.status(500).json({
                success: false,
                error: error.message
            })
        }

    }
)

// RESET PASSWORD ---- NOT WORKING DUE TO FORGOT PASSWORD NODEMAILER ISSUE

exports.resetPassword = expressAsyncHandler(
    async (req, res, next) => {
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");


        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            res.status(404).json({
                success: false,
                message: "Invalid Token"
            })
        }
        if (req.body.password != req.body.confirmpassword) {
            return next(new Error("Password does not password"));
        }
        //Update the password and remove token from database
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        sendToken(user, 200, res);
    }
);

// GET USER DETAILS ---- TESTED

exports.getUserDetails = expressAsyncHandler(
    async (req, res, next) => {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            user
        })
    }
)

// UPDATE USER PASSWORD ---- TESTED

exports.updateUserPassword = expressAsyncHandler(
    async (req, res, next) => {
        const user = await User.findById(req.user.id).select("+password");
        console.log(user.password);
        console.log(req.body.oldPassword);

        const ispasswordmatched = user.comparePass(req.body.oldPassword);

        if (!ispasswordmatched) {
            next(new Error("Old password is incorrect"));
        }

        if (req.body.newPassword != req.body.confirmpassword) {
            next(new Error("Password does not match"));
        }

        user.password = req.body.newPassword;

        await user.save();

        sendToken(user, 200, res);
    }
)

// UPDATE USER PROFILE ---- TESTED

exports.updateUserProfile = expressAsyncHandler(
    async (req, res, next) => {

        const newUserData = {
            name: req.body.name,
            email: req.body.email
        }

        await User.findByIdAndUpdate(req.body.id, newUserData, {
            new: true,
            runValidators: true,
            userFindAndModify: false,
        });

        res.status(200).json({
            success: true
        })

    }
)

// GET ALL USERS ---- ADMIN ---- TESTED

exports.getAllUsers = expressAsyncHandler(
    async (req, res, next) => {
        const users = await User.find();

        res.status(200).json({
            success: true,
            users
        })
    }
)

// GET SINGLE USER ---- ADMIN ---- TESTED

exports.getSingleUser = expressAsyncHandler(
    async (req, res, next) => {
        const user = await User.findById(req.params.id);

        if (!user) {
            next(new Error("No such user exists"))
        }

        res.status(200).json({
            success: true,
            user
        })
    }
)