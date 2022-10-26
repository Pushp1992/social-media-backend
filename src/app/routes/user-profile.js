// all HTTP method (GET/PUT/POST/DELETE) route endpoint will be present here

module.exports = (app) => {

    // import controller here, which contains method for all CRUD operations
    const UserProfileController = require('../controller/user-profile-controller');

    // api endpoint to create user profile
    app.post('/create-profile', UserProfileController.createUserProfile);

    // api endpoint to fetch all user profile
    app.get('/get-profile', UserProfileController.getUserProfile);

    // api endpoint to fetch user profile by id
    app.get('/get-profile/:id', UserProfileController.getUserProfileById);

    // api endpoint to update user profile
    app.put('/update-profile/:id', UserProfileController.updateUserProfileById);

    // api endpoint to delete user profile
    app.delete('/delete-profile/:id', UserProfileController.deleteUserProfileById);

    // api endpoint to delete all user profiles
    app.delete('/delete-profile', UserProfileController.deleteUserProfile);
}