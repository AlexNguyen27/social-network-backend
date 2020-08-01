const typeDef = `
  extend type Query {
    getCategories: [Category]
  }

  extend type Mutation {
    createCategory(name: String!, status: String): Category,
    updateCategory(id: String!, name: String, status: String): Category,
    deleteCategory(id: String!): SuccessMessage
  }

  type Category {
    id: String
    name: String
    status: String
    posts: [Post]
    createdAt: DateTime
  }

`;

export default typeDef;
