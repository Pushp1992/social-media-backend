// Social media POST schema structure

const mongoose = require('mongoose');

const UserPostSchema = mongoose.Schema(
    {
        _id: Number,
        image_url: String,
        content: String,
        email: String,
        created_by: String,
        creation_date: String,
        like_count: Number
    },
    { timeStamps: true }
);

module.exports = mongoose.model('UserPostSchema', UserPostSchema);
