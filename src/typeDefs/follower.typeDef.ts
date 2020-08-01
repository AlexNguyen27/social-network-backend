const typeDef = `
  extend type Mutation {
    createFollower(toUserId: String!): SuccessMessage,

    deleteFollower(toUserId: String!): SuccessMessage,
  }
`;

export default typeDef;
