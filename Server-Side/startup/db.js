const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function (params) {
  mongoose.connect("mongodb://localhost:27017/bioma").then(() => winston.info("Database connected."));
};
