const { default: strictTransportSecurity } = require('helmet/dist/middlewares/strict-transport-security');
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        unique: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        default: "password",
        min: 6,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    phone:{
        type:Number,
    },
    isAdmin:{
        type:Boolean,
    },
    address:{
        
    }

},{timestamps:true})

module.exports=mongoose.model('User',userSchema);
