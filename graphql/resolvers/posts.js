const Post = require('../../models/Post');

module.exports = {
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