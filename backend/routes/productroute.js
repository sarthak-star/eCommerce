const express = require("express");
const { getallproducts, createProduct, updateProduct, deleteProduct, getproduct, createProductReview, getallreviews, deleteReview } = require("../controllers/productcontroller");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");



const router = express.Router();



router.route("/products").get(getallproducts);

router.route("/admin/product/new").post(isAuthenticated,authorizeRole("admin") , createProduct);

router.route("/admin/product/:id").put(isAuthenticated, authorizeRole("admin") ,updateProduct).delete(isAuthenticated, authorizeRole("admin") ,deleteProduct);

router.route("/product/:id").get(getproduct);

router.route("/review").put(isAuthenticated , createProductReview);

router.route("/reviews").get(getallreviews).delete(isAuthenticated , deleteReview);




module.exports = router;