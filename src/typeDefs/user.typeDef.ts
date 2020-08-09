const typeDef = `
  extend type Query {
    getUsers: [User]
  }

  extend type Mutation {
    updateUser(
      info: InfoInput
    ): User,

    deleteUser(id: String!): SuccessMessage,
  }

  input InfoInput {
    id: String,
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    imageUrl: String,
    githubUsername: String,
    role: String,
  }

  type SuccessMessage {
    status: Int,
    message: String
  }

  type User {
    id: String,
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    password: String,
    imageUrl: String,
    githubUsername: String,
    role: String,
    posts: [Post]
    createdAt: DateTime,
    updatedAt: DateTime,
  }

`;

export default typeDef;
