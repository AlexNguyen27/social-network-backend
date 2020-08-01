const typeDef = `
  extend type Mutation {
    createReaction(userId: String!, postId: String!, reactionTypeId: String!): SuccessMessage,
  }
`;

export default typeDef;
