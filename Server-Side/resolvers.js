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
    productsByCategoryID: async (_, { id, pageNumber, pageSize = 9 }, context) => {
      if (pageSize < 1) return { totalProducts: null, products: [] };
      const category = await Category.findById(id);
      if (!category) return { errorMessage: "Invalid Category" };
      const totalProducts = await Product.find({ category }).count();
      const products = await Product.find({ category })
        .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
        .limit(pageSize);
      return { totalProducts, products };
    },
    products: async (_, { pageNumber, pageSize = 9 }, context) => {
      if (pageSize < 1) return { totalProducts: null, products: [] };
      const totalProducts = await Product.find().count();
      const products = await Product.find()
        .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
        .limit(pageSize)
        .sort("createdDate");
      return { totalProducts, products };
    },
    product: async (_, { id }, context) => {
      return await Product.findById(id);
    }
    // products: async (_, { pageSize = 9, after }, context) => {
    //   const results = await Product.find().count();
    //   console.log(results);
    // }
    // count: async (_, __) => await Product.find().count()
  }
};
