// const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = require("graphql");
// const GraphQLDate = require("graphql-date");
// const { Category } = require("./models/category");
// const { Product } = require("./models/product");
// const Joi = require("joi");

// function validateID(object) {
//   const schema = Joi.object({
//     _id: Joi.objectId().required()
//   });
//   return schema.validate(object);
// }
// const CategoryType = new GraphQLObjectType({
//   name: "Category",
//   fields: () => ({
//     _id: { type: GraphQLString },
//     name: { type: GraphQLString }
//   })
// });

// const ProductType = new GraphQLObjectType({
//   name: "Product",
//   fields: () => ({
//     _id: { type: GraphQLString },
//     name: { type: GraphQLString },
//     price: { type: GraphQLInt },
//     category: { type: CategoryType },
//     createdDate: {
//       type: GraphQLDate
//     },
//     numberInStock: { type: GraphQLInt }
//   })
// });

// const RootQuery = new GraphQLObjectType({
//   name: "RootQueryType",
//   fields: {
//     categories: {
//       type: new GraphQLList(CategoryType),
//       async resolve(parent, args) {
//         return await Category.find().sort({ name: 1 });
//       }
//     },
//     productsByCategoryID: {
//       type: new GraphQLList(ProductType),
//       args: {
//         _id: { type: GraphQLString }
//       },
//       async resolve(parent, args) {
//         const { error } = validateID({ _id: args._id });
//         if (error) return error.details[0].message;
//         const category = await Category.findById(args._id);
//         if (!category) return "Invalid Category";
//         return await Product.find({ category }).sort("createdDate");
//       }
//     }
//   }
// });

// module.exports = new GraphQLSchema({
//   query: RootQuery
// });

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Your schema will go here
  scalar Date

  type Product {
    id: ID!
    name: String
    price: Int
    category: Category
    images: [String]
    numberInStock: Int
    createdDate: Date
  }
  type Category {
    id: ID!
    name: String
  }
  type Query {
    categories: [Category]
    productsByCategoryID(id: ID!): [Product]
  }
`;

module.exports = typeDefs;
