// all HTTP method (GET/PUT/POST/DELETE) route endpoint will be present here

module.exports = (app) => {

    // import controller here, which contains method for all CRUD operations
    const SocialMediaController = require('../controller/social-media-controller');

    // api endpoint to create user profile
    app.post('/create-profile', SocialMediaController.createUserProfile);

    // api endpoint to fetch all user profile

    // api endpoint to fetch user profile by id
    app.get('/get-profile/:id', SocialMediaController.getUserProfileById);

    // api endpoint to update user profile
}