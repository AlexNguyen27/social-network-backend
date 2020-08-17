const typeDef = `
  extend type Mutation {
    createReaction(userId: String!, postId: String!, reactionTypeId: String!): SuccessMessage,
  }

  type Reaction {
    userId: String
    reactionTypeId: String,
    postId: String
  }
`;

export default typeDef;
