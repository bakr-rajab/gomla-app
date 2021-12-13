const Category=require("../models/Category");
const { categoryValidation } = require("../validation");
const mongoose = require('mongoose')
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
         await  newCategory.save()
         .then((category) => res.status(200).json(category))
            .catch((err) => next(err))
  } catch (error) {
    // next(error);
    res.status(500).json({error: error.message});
  }
};
// get all category
exports.index=async(req,res,next)=> {
    try {
      const categories = await Category.find({})
      res.status(200).json({data:categories})
    } catch (error) {
      res.status(404).json({message: error.message})
      // next(error);
    }
}
// get spesific category by id
exports.show=async(req,res,next)=> {
  // validate id
 if(!mongoose.isValidObjectId(req.params.id)) {
   return res.status(400).send('Invalid Category Id')
 }
  try {
    const category = await Category.findById(req.params.id)
    res.status(200).json({data:category})
  } catch (error) {
    // next(error);
    res.status(404).json({message: error.message})
  }
}
exports.update = async (req, res, next) => {
  if(!mongoose.isValidObjectId(req.params.id)) {
     res.status(400).send('Invalid Category Id')
 }
  try {
    const category=await Category.findOneAndUpdate({"_id":req.params.id},req.body,{new:true,runValidators:true});
    res.status(201).json({data:category});
  } catch (error) {
    res.status(404).json({error:error.message});
    // next(error);
  }
};
exports.destroy = async (req, res, next) => {
  if(!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({message: 'Invalid Category Id'})
  }
    Category.findByIdAndRemove({"_id":req.params.id}).then(category => {
      if(category){
        return res.status(200).json({success:"1 word deleted successful...",daletedCategory:category})
      }else{
        return res.status(404).json({error:"word not found"})
      }
    });
};
