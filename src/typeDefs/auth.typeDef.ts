const typeDef = `
  extend type Query {
    login(username: String!, password: String!): LoginOutput
  }

  extend type Mutation {
    register(
      username: String!,
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      address: String,
      password: String!,
      imageUrl: String,
      githubUsername: String,
      role: String!
    ): RegisterOutput
  }

  type LoginOutput {
    id: String,
    token: String,
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
    createdAt: DateTime,
    updatedAt: DateTime,
  }

  type RegisterOutput {
    id: String,
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    assress: String,
    password: String,
    imageUrl: String,
    githubUsername: String,
    role: String,
    createdAt: DateTime,
    updatedAt: DateTime,
  }
`;

export default typeDef;
