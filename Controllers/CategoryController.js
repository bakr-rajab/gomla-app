const Product = require("../models/Product");
const Category=require("../models/Category");
const { categoryValidation } = require("../validation");

exports.create = async (req, res,next) => {
    // res.send(req.body)
    // validate input parameters
    const { error } =categoryValidation(req.body);
    if (error) {
      return res
        .status(402)
        .json({ error: error.details[0].message, status: "error" });
        // process.exit(1);
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
exports.index=async(req,res,next)=> {
    try {
      const categories = await Category.find({})
      res.json(categories)
    } catch (error) {
      next(error);
    }
}
exports.show=async(req,res,next)=> {
  try {
    // res.send(req.params);
    const category = await Category.findById(req.params.id)
    res.json(category)
  } catch (error) {
    next(error);
  }
}