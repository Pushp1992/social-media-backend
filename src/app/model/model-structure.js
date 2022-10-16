// Social media model structure

const mongoose = require('mongoose');

const SocialMediaSchema = mongoose.Schema (
    {
        _id: String,
        photoUrl: String,
        name: String,
        emil: String,
        gender: String,
        location: String,
        city: String
    },
    {timeStamps: true}
);

module.exports = mongoose.model('SocialMediaSchema', SocialMediaSchema);
