const typeDef = `
  extend type Query {
    getReports: [Report]
  }

  extend type Mutation {
    createReport(
      reportedBy: String!,
      postId: String!
      reason: String
      description: String,
      imageUrl: String
      status: String,
    ): Report,
    updateRerport(reportedBy: String!, postId: String!, description: String, status: String!): Report,
    deleteReport(reportedBy: String!, postId: String!): SuccessMessage
  }

  type Report {
    reportedBy: String
    postId: String
    reason: String,
    description: String,
    imageUrl: String
    status: String
    post: Post
    user: User
    createdAt: DateTime
    updatedAt: DateTime
  }

`;

export default typeDef;
