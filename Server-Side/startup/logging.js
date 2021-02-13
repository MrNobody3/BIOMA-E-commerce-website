const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(new winston.transports.MongoDB({ db: "mongodb://localhost:27017/bioma", level: "info" }));
};
