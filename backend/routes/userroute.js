const express = require("express");
const { registerUser, loginUser, logoutUser, forgotpassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUsers, getSingleUser } = require("../controllers/usercontroller");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");


const router = express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotpassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticated ,getUserDetails);

router.route("/password/update").put(isAuthenticated ,updateUserPassword);

router.route("/me/update").put(isAuthenticated ,updateUserProfile);

router.route("/admin/users").get(isAuthenticated , authorizeRole("admin") , getAllUsers);

router.route("/admin/user/:id").get(isAuthenticated , authorizeRole("admin") , getSingleUser);





module.exports = router;