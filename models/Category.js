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
    },
    color:{
        type:String,
    },
    icon:{
        type:String,
    }
},{timestamps:true})

categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});
module.exports=mongoose.model('Category',categorySchema);