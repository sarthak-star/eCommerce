const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const cloudinary = require("cloudinary");

dotenv.config({path : "backend/config/config.env" });

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT , console.log(`Server is running on PORT ${process.env.PORT}`));