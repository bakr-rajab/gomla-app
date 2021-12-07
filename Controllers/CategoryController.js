const Product = require("../models/Product");
const Category=require("../models/Category");
const { categoryValidation } = require("../validation");
// create new category
exports.create = async (req, res,next) => {
    // validate input parameters
    const { error } =categoryValidation(req.body);
    if (error) {
      return res
        .status(402)
        .json({ error: error.details[0].message, status: "error" });
    } 
    try {
        const newCategory = new Category(req.body); 
         await  newCategory.save().
            then((category) => res.status(200).json(category))
            .catch((err) => next(err))
  } catch (error) {
    next(error);
  }
};
// get all category
exports.index=async(req,res,next)=> {
    try {
      const categories = await Category.find({})
      res.status(200).json(categories)
    } catch (error) {
      next(error);
    }
}
// get spesific category by id
exports.show=async(req,res,next)=> {
  try {
    const category = await Category.findById(req.params.id)
    res.status(200).json(category)
  } catch (error) {
    next(error);
  }
}
exports.update = async (req, res, next) => {
  try {
    const category=await Category.findOneAndUpdate({"_id":req.params.id},req.body,{new:true,runValidators:true});
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};
exports.destroy = async (req, res, next) => {
    const todo = await Category.deleteOne({"_id":req.params.id});
    if(todo.deletedCount === 1){
      return res.status(200).json({success:"1 word deleted successful..."})
    }else{
      return res.status(404).json({success:"word not found"})
    }
};
