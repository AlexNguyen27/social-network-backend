const typeDef = `
  extend type Query {
    getUsers: [User]
  }

  extend type Query {
    getUserProfile(userId: String!): UserProfile
  }

  extend type Mutation {
    updateUser(
      info: InfoInput
    ): User,

    deleteUser(id: String!): SuccessMessage,
  }

  type UserProfile {
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
    quote: String,
    dob: DateTime,
    role: String,
    createdAt: DateTime,
    updatedAt: DateTime,
    posts: [Post]
    followed: [Follower]
    userFavoritePosts: [Post]
  }

  input InfoInput {
    id: String,
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    quote: String,
    dob: DateTime,
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
    quote: String,
    dob: DateTime,
    role: String,
    posts: [Post],
    createdAt: DateTime,
    updatedAt: DateTime,
  }

`;

export default typeDef;
