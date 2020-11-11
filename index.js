// Dependancy imports
const { ApolloServer } = require('apollo-server');
// mongoose object relational mapper, which lets you interface with the mongoDB database.
const mongoose = require('mongoose');

// Relative imports
const typeDefs = require('./graphql/typeDefs');
// For each query or mutation or subscription, there is a corresponding resolver. Each resolver 
// processes logic and returns what the query returns.
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

// set up Apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// connect to MongoDB database and pass useNewUrlParser and useUnifiedTopology to stop deprecation 
// warning, which returns a promise where you start the server, specifying a port that returns a 
// promise with a result object.
mongoose
    .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        return server.listen({ port: 5000 });
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    });

