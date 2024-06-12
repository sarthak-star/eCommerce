const mongoose = require("mongoose");

const ProductSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"]
    },
    description:{
        type:String,
        required:[true,"Please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter product price"],
        maxlength:[8,"price cannot exeed 8 characters"]
    },
    ratings:{
        type:String,
        default:"0" //default value is zero if not provided in the form data
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type : String,
        required:[true,"Please enter category"]
    },
    stock:{
        type:Number,
        required:[true,"Pleas enter stock"],
        default:1
    },
    numofReviews:{
        type:Number,
        default : 0
    },
    Reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                default:""
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            Comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

}); 

module.exports = mongoose.model("Product",ProductSchema);
