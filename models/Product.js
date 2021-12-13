const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      min: 3,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      default: 0,
    },
    brand: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    countInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    offer:{
      type:Number,
      default: 0.0,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
