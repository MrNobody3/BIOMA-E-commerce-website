const mongoose = require("mongoose");
const categorySchema = require("./category");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: categorySchema,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  numberInStock: {
    type: Number,
    min: 0
  },
  images: {
    type: [String]
  }
  // buyCount : {
  //   type: Number,
  //   min: 0
  // }
});

const Product = mongoose.model("Product", productSchema);

module.exports.Product = Product;
