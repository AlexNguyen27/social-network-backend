const typeDef = `
  extend type Query {
    getPosts(
      all: Boolean,
      userId: String,
    ): [Post],

    getPostById(id: String!): Post
  }

  extend type Mutation {
    createPost(
      title: String!
      description: String
      imageUrl: String
      status: String
      categoryId: String!
      userId: String!
    ): Post,

    updatePost(
      id: String!
      title: String
      description: String
      imageUrl: String
      status: String
    ): Post,

    deletePost(id: String!): SuccessMessage
  }

  type Post {
    id: String,
    title: String,
    description: String,
    imageUrl: String,
    status: String,
    categorId: String,
    comments: [Comment]
    createdAt: DateTime,
    updatedAt: DateTime
  }
`;

export default typeDef;