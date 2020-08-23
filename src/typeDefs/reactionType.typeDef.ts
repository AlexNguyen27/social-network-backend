const typeDef = `
  extend type Query {
    getReactionTypes: [ReactionType]
  }

  extend type Mutation {
    createReactionType(name: String!): ReactionType,
    updateReactionType(id: String!, name: String): ReactionType,
    deleteReactionType(id: String!): SuccessMessage
  }

  type ReactionType {
    id: String
    name: String
  }
`;

export default typeDef;
