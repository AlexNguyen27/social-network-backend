const typeDef = `
  extend type Query {
    getCommentsbyPostId(postId: String!): [Comment]
  }

  extend type Mutation {
    createComment(
      comment: String!,
      userId: String!,
      postId: String!,
      parentId: String,
    ): Comment,

    updateComment(
      id: String!,
      comment: String!
    ): Comment,

    deleteComment(
      id: String!
    ): SuccessMessage
  }

  type Comment {
    id: String
    comment: String
    userId: String
    user: CommentUser
    postId: String
    parentId: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type CommentUser {
    username: String,
    firstName: String,
    lastName: String,
    imageUrl: String,
  }
`;

export default typeDef;
