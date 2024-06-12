const express = require("express");
const { createNewOrder, getsingleorder, getmyorders, getallorders, updateOrder, deleteorder } = require("../controllers/ordercontroller");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");
const router = express.Router();


router.route("/order/new").post( isAuthenticated , createNewOrder);

router.route("/order/:id").get( isAuthenticated , getsingleorder);

router.route("/order/me").get( isAuthenticated , getmyorders);

router.route("/admin/orders").get(isAuthenticated , authorizeRole("admin") , getallorders);

router.route("/admin/order/:id").put(isAuthenticated , authorizeRole("admin") , updateOrder).delete(isAuthenticated , authorizeRole("admin") , deleteorder);




module.exports = router;