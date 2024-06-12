const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

exports.isAuthenticated = expressAsyncHandler(
    async (req, res, next) => {

        const { token } = req.cookies;
        console.log(token);
        if (!token) {
            res.status(401).json({
                success: false,
                error: "Please login to access"
            })
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decodedData.id);

        next();

    }
)

exports.authorizeRole = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                sucess: false,
                error: "You are not authorized for this action!"
            })
        }

        next();
    }
} 