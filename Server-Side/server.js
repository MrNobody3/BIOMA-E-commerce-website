const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const winston = require("winston");
const cors = require("cors");
const schema = require("./schema");
const { Product } = require("./models/product");
const { Category } = require("./models/category");
const app = express();

require("./startup/logging")();
require("./startup/db")();

app.use(cors());

// async function createProducts() {
//   console.log("calling create product");
//   const category = await Category.findById("602806b7a339bd35c065794b");
//   await new Product({ name: "Product 1", price: 100, category, numberInStock: 100 }).save();
//   await new Product({ name: "Product 2", price: 100, category, numberInStock: 100 }).save();
// }
// createProducts();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => winston.info(`Server listening on PORT ${PORT}`));
