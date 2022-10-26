// all HTTP method (GET/PUT/POST/DELETE) route endpoint for user POST will be present here

module.exports = (app) => {

    // import controller here, which contains method for all CRUD operations
    const UserPostController = require('../controller/user-post-controller');

    // api endpoint to create post
    app.post('/create-post', UserPostController.createPost);

    // api endpoint to fetch all post
    app.get('/get-post', UserPostController.getPost);

    // api endpoint to fetch post by id
    app.get('/get-post/:id', UserPostController.getPostById);

    // api endpoint to update post
    app.put('/update-post/:id', UserPostController.updatePostById);

    // api endpoint to delete post
    app.delete('/delete-post/:id', UserPostController.deletePostById);

    // api endpoint to delete all posts
    app.delete('/delete-post', UserPostController.deletePost);
}