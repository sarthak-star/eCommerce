
// REQUIRED IMPORTS

const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productmodel");
const ApiFeatures = require("../utils/apifeatures");
const asyncHandler = require("express-async-handler");
const { Error } = require("mongoose");

// -----------------------------------------------------------

// Create Product ---- ADMIN ---- TESTED

exports.createProduct = asyncHandler(
    async (req, res) => {
        req.body.user = req.user.id;

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        })

    }
)

// Fetching all products --- TESTED

exports.getallproducts = asyncHandler(
    async (req, res) => {
        const ResultsPerPage = 8;
        const productCount = await Product.countDocuments();
        const apifeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(ResultsPerPage);
        const products = await apifeatures.query;
    
        res.status(200).json({
            success: true,
            products,
            productCount
        });
    }
)

// Fetch single product ---- TESTED

exports.getproduct = asyncHandler(
    async (req, res) => {

        const product = await Product.findById(req.params.id);
    
        if (!product) {
            res.status(500).json({
                success: false,
                message: 'No Such Product Found'
            })
        }
    
        res.status(200).json({
            success: true,
            product
        })
    
    
    }
)

// Update Product ---- ADMIN ---- TESTED

exports.updateProduct = asyncHandler(
    async (req, res, next) => {

        let product = Product.findById(req.params.id);
    
        if (!product) {
            return res.status(500).json({
                success: false,
                message: "No such product found"
            });
        }
    
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    
        res.status(200).json({
            sucess: true,
            product
    
        });
    
    
    }
)

// Delete Product ---- ADMIN ---- TESTED

exports.deleteProduct = asyncHandler(
    async (req, res) => {

        const product = await Product.findById(req.params.id);
    
        if (!product) {
            res.status(500).json({
                success: false,
                message: "Product not found"
            })
        }
    
        await product.deleteOne();
    
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    
    }
)

// CREATE / UPDATE REVIEW ---- TESTED

exports.createProductReview = expressAsyncHandler(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      Comment: comment,
    };
  
    const product = await Product.findById(productId);
    if(!product){
        res.json({
            message:"No such product exists",
        })
    }
  
    const isReviewed = product.Reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.Reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.Comment = comment);
      });
    } else {
      product.Reviews.push(review);
      product.numofReviews = product.Reviews.length;
    }
  
    let avg = 0;
  
    product.Reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.Reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });

// GETTING ALL REVIEWS OF A PRODUCT ---- TESTED

exports.getallreviews = expressAsyncHandler(
    async (req,res,next) =>{
        const product = await Product.findById(req.query.id);

        if( !product ){
            next(new Error("Product not found"))
        }

        res.status(200).json({
            success:true,
            reviews:product.Reviews,
        })
    }
)

// DELETING A REVIEW ---- TESTED

exports.deleteReview = expressAsyncHandler(
    async(req,res,next) =>{
        const product = await Product.findById(req.query.productId);

        if( !product ){
            next(new Error("Product not found"))
        }

        const reviews = product.Reviews.filter( (rev) => rev._id.toString() !== req.query.id.toString())

        let sum = 0;

        reviews.forEach((rev)=>{
            sum+= rev.rating;
        });
        const ratings = sum / reviews.length;

        const numofReviews = reviews.length;

        await Product.findByIdAndUpdate(req.query.productId , {
            reviews,
            ratings,
            numofReviews 
        },
        {
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        
    }
)