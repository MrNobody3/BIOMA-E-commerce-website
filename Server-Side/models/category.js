const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  }
});

const Category = mongoose.model("Category", categorySchema);

module.exports.Category = Category;
module.exports.categorySchema = categorySchema;
