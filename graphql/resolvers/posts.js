const { AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../utils/checkAuth');

module.exports = {
    Query: {
        // Uses post model to fetch the posts. Add try catch block so if query fails, it doesn't stop the
        // server. Async operation to fetch all posts because there is no condition in find(). sort() gets 
        // the latest posts first.
        async getPosts() {
            try{
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch(err) {
                throw new Error(err);
            }
        },

        // Uses post model to fetch a post with an ID, that matches with the argument that was passed in. 
        // If there is a match, return this post otherwise throw an error.
        async getPost(_, { postId }) {
            try{
                const post = await Post.findById(postId);
                if(post) {
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch(err) {
                throw new Error(err);
            }
        }
    },

    Mutation: {
        // context has the request body and can access the headers and determine whether a user is authenticated. 
        async createPost(_, { body }, context) {
            const user = checkAuth(context);
            console.log(user);

            // If the following code runs, there was no errors with authorising a user
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            // save the post
            const post = await newPost.save();

            return post;
        },

        // similar to createPost() but only allow users to delete posts they have created.
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context);

            try {
                // find the post that matches the argument id.
                const post = await Post.findById(postId);
                // if the username matches with the post's username, delete the post. Otherwise,
                // throw an authentication error. 
                if(user.username === post.username) {
                    await post.delete();
                    return 'Post deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch(err) {
                throw new Error(err);
            }
            
        }
    }
};