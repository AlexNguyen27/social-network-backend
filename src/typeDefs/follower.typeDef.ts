const typeDef = `
  extend type Mutation {
    createFollwer(toUserId: String!): SuccessMessage,

    deleteFollower(toUserId: String!): SuccessMessage,
  }
`;

export default typeDef;
