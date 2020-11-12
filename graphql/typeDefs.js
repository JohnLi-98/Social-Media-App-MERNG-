const { gql } = require('apollo-server');

// Type Definitions with tag template string. Return queries is better to have an exclamtion mark
// for type safety, although it is not required.

// input are given as an input to a resolver for it to return something.
// Instead of putting the input as arguments for register(), a type is created for it instead
module.exports = gql`
    type Post{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }

    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Query{
        getPosts: [Post]
        getPost(postId: ID!): Post
    }

    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!) : User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
    }
`;