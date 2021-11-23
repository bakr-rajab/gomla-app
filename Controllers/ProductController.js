const Category = require("../models/Category");
const Product = require("../models/Product");
const { productValidation } = require("../validation");

exports.create = async (req, res,next) => {
    // res.send(req.body)
    // validate input parameters
    const { error } =productValidation(req.body);
    if (error) {
       // next(error)
       return res
        .status(402)
        .json({ error: error.details[0].message, status: "error" });
        // process.exit(1);
    }
    // const { name, category, price,brand, description,rating,reviews,img} = req.body;
    const newProduct = new Product(req.body); 
    try {
      await  newProduct.save().then((product) => res.status(200).json(product))
            .catch((err) => next(err))
  } catch (error) {
    next(error);
  }
};
exports.getAll=async(req,res,next)=> {
    try {
      const products = await Product.find({})
      res.json(products)
    } catch (error) {
      next(error);
    }
}
exports.show=async(req,res,next)=> {
  try {
    // res.send(req.params);
    const product = await Product.findById(req.params.id)
    res.json(product)
  } catch (error) {
    next(error);
  }
}
exports.createProduct = async (req, res,next) => {
  // res.send(req.body)
  // validate input parameters
  const { error } =productValidation(req.body);
  if (error) {
    return res
      .status(402)
      .json({ error: error.details[0].message, status: "error" });
      // process.exit(1);
  }
  try {
    // return res.json(req.params)
    req.body['category_id']=req.params.id
    // return res.json(req.body)

    const newProduct = new Product(req.body); 
    // newCategory.category_id =req.params.id
    const product = await  newProduct.save()
    // const category= await Category.findById(req.params.id)
    return res.status(200).json(product);
    // category.product.push(product)
    // const newCategory= await category.save();    
    // return res.json(newCategory)
} catch (error) {
  next(error);
}
};
exports.index=async(req,res,next)=> {
  try {
    // res.send(req.params);
    const category = await Category.findById(req.params.id).populate("products")
    res.json(category)
  } catch (error) {
    next(error);
  }
}