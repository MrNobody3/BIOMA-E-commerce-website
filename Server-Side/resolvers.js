const { Category } = require("./models/category");
const { Product } = require("./models/product");
const { GraphQLScalarType, Kind } = require("graphql");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // Convert hard-coded AST string to type expected by parseValue
    }
    return null; // Invalid hard-coded value (not an integer)
  }
});
module.exports = {
  Date: dateScalar,
  Query: {
    categories: async (_, __, context) => await Category.find().sort({ name: 1 }),
    productsByCategoryID: async (_, { id }, context) => {
      const category = await Category.findById(id);
      if (!category) return { errorMessage: "Invalid Category" };
      const products = await Product.find({ category }).sort("createdDate");
      return products;
    }
  }
};
