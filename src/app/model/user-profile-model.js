// Social media Profile schema structure

const mongoose = require('mongoose');

const UserProfileSchema = mongoose.Schema(
    {
        _id: String,
        name: String,
        email: String,
        image_url: String,
        gender: String,
        age: Number,
        DOB: String,
        location: String,
        mobile: Number,
        bio: String,
        profile_creation_date: String
    },
    { timeStamps: true }
);

module.exports = mongoose.model('UserProfileSchema', UserProfileSchema);
