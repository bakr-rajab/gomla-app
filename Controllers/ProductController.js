const Category = require("../models/Category");
const Product = require("../models/Product");
const { productValidation } = require("../validation");

exports.create = async (req, res, next) => {
  // validate input parameters
  const { error } = productValidation(req.body);
  if (error) {
    return res
      .status(402)
      .json({ error: error.details[0].message, status: "error" });
  }
  const newProduct = new Product(req.body);
  try {
    await newProduct
      .save()
      .then((product) => res.status(200).json(product))
      .catch((err) => next(err));
  } catch (error) {
    next(error);
  }
};

exports.index = async (req, res, next) => {
  try {
    let filter = {};
    if (req.query.categories) {
      filter.categories = req.query.categories.split(",");
    }
    if (req.query.isFeatured) {
      filter.isFeatured = req.query.isFeatured;
    }
    if (req.query.offer) {
      filter.offer = req.query.offer;
    }
    const products = await Product.find(filter).populate("category");
    res.json(products);
  } catch (error) {
    next(error);
  }
};
exports.show = async (req, res, next) => {
  try {
    // res.send(req.params);
    const product = await Product.findById(req.params.id).populate("category");
    res.json(product);
  } catch (error) {
    next(error);
  }
};
exports.createProduct = async (req, res, next) => {
  // validate input parameters
  const { error } = productValidation(req.body);
  if (error) {
    return res
      .status(402)
      .json({ error: error.details[0].message, status: "error" });
  }
  try {
    // req.body['category_id']=req.params.id
    const newProduct = new Product(req.body);
    const product = await newProduct.save();
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
exports.delete = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};
