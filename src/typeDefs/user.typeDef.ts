const typeDef = `
  extend type Query {
    getUsers: [User]
  }

  extend type Mutation {
    updateUser(
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
    ): User,

    deleteUser(id: String!): SuccessMessage,
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
