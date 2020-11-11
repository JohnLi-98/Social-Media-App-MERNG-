// Dependancy imports
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
// mongoose object relational mapper, which lets you interface with the mongoDB database.
const mongoose = require('mongoose');

// Relative imports
const Post = require('./models/Post');
const { MONGODB } = require('./config.js');

// Type Definitions with tag template string. Return queries is better to have an exclamtion mark
// for type safety, although it is not required.
const typeDefs = gql`
    type Post{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    type Query{
        getPosts: [Post]
    }
`
// For each query or mutation or subscription, there is a corresponding resolver. Each resolver 
// processes logic and returns what the query returns.
const resolvers = {
    Query: {
        // Uses post model to fetch the posts. Add try catch block so if query fails, it doesn't stop the
        // server. Async operation to fetch all posts because there is no condition in find().
        async getPosts() {
            try{
                const posts = await Post.find();
                return posts;
            } catch(err) {
                throw new Error(err);
            }
        }
    }
}

// set up Apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// connect to MongoDB database and pass useNewUrlParser and useUnifiedTopology to stop deprecation 
// warning, which returns a promise where you start the server, specifying a port that returns a 
// promise with a result object. test
mongoose
    .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        return server.listen({ port: 5000 });
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    });

