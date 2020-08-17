const typeDef = `
  extend type Mutation {
    createFollower(toUserId: String!): SuccessMessage,
    deleteFollower(toUserId: String!): SuccessMessage,
  }

  type Follower {
    fromUserId: String,
    toUserId: String,
    createdAt: DateTime
  }
`;

export default typeDef;
