const mongoose = require('mongoose')
const Schema= mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
    },
    image:{
        type:String,
        // required:true
    },
    color:{
        type:String,
    },
    icon:{
        type:String,
    },
    products:[{
        type:Schema.Types.ObjectId,
        ref:"Product"
    }]
},{timestamps:true})

module.exports=mongoose.model('Category',categorySchema);