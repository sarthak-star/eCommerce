const Order = require("../models/ordermodel");
const Product = require("../models/productmodel");
const expressAsyncHandler = require("express-async-handler");

// CREATE ORDER

exports.createNewOrder = expressAsyncHandler(
    async (req, res, next) => {
        const { orderItems, shippingInfo, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body;
        const order = await Order.create({
            orderItems,
            shippingInfo,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt:Date.now(),
            user:req.user._id
        });

        res.status(200).json({
            success : true,
            order
        })
    }
)

// GET SINGLE ORDER

exports.getsingleorder = expressAsyncHandler(
    async(req,res,next) =>{
        const order = await Order.findById(req.params.id).populate("user","name email");

        if(!order){
            return next(new Error("No such order found"));
        }

        res.status(200).json({
            success:true,
            order
        })
    }
)

// GET ALL ORDERS FOR LOGGED IN USER

exports.getmyorders = expressAsyncHandler(
    async(req,res,next) =>{
        console.log("HELOOOO");
        console.log(req.user);
        const order = await Order.find({user : req.user._id});

        if(!order){
            return next(new Error("You have no current orders"));
        }

        res.status(200).json({
            success:true,
            order
        })


    }
)

// GET ALL ORDERS ---- ADMIN

exports.getallorders = expressAsyncHandler(
    async(req,res,next) =>{
        const orders = await Order.find();

        let totalamount = 0;
        orders.forEach((orders) =>{
            totalamount += orders.totalPrice;
        });




        res.status(200).json({
            success:true,
            orders
        })
    }
)

// UPDATE ORDER STATUS ---- ADMIN

exports.updateOrder = expressAsyncHandler(
    async (req,res,next) =>{
        const order = await Order.findById(req.params.id);

        if(!order){
            return next(new Error("No such Order found"))
        }

        if(order.orderStatus === "Delivered"){
            return next(new Error("The order is already completed"));
        }
        order.orderItems.forEach(async (o) =>{
            await updateStock(o.product, o.quantity );
        });

        order.orderStatus = req.body.status;
        
        if(req.body.status === "Delivered"){
            order.deliveredAt = Date.now();
        }

        await order.save({validateBeforeSave: false});

        res.status(200).json({
            success:true,
            order
        })


    }
)

async function updateStock(id , quantity){
    const product =await Product.findById(id);

    product.stock -= quantity;
    await product.save({validateBeforeSave:false});

}

// DELETE ORDER

exports.deleteorder = expressAsyncHandler(
    async (req,res,next) =>{
        // find the order and delete it
        const order=  await Order.findById(req.params.orderId);

        if( !order ){
            return next(new Error("No such order found"));
        }

        order.remove();

        res.status(200).json({
            success : true
        })
    }
)