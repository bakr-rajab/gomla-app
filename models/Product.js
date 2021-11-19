const mongoose = require('mongoose')
const Schema= mongoose.Schema;
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:"Category"
    },
    image:{
        type:String,
        required:true
    },
    images:{
        type:Array
    },
    price:{
        type:Number,
        default:0
    },
    brand:{
        type:String,
        default:""
    },
    rating:{
        type:Number,
        default:1
    },
    reviews:{
        type:Number,
        default:1
    },
    description:{
        type:String,
        default:""
    },
    countInStock:{
        type:Number,
        default:1
    }
},{timestamps:true})

module.exports=mongoose.model('Product',productSchema);