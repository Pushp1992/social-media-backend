
const SocialMediaModel = require('../model/model-structure');

// create user profile goes here
exports.createUserProfile = async (req, res) => {
    const REQUEST_BODY = req.body;

    // validate request body
    if (!REQUEST_BODY || !req.body.email) {
        return res.status(400).send({
            status: res.statusCode,
            message: res.statusMessage || `payload or email cannot be empty`
        });
    }

    // create profile function
    createProfile(REQUEST_BODY, res);
};

const createProfile = async (data, res) => {
    const {
        id,
        photoUrl,
        name,
        email,
        gender,
        location,
        city
    } = data;

    // create profile
    const profile = new SocialMediaModel({
        _id: id,
        photoUrl: photoUrl,
        name: name,
        email: email,
        gender: gender,
        location: location,
        city: city
    });

    // save profile in databse
    profile.save()
        .then(data => {
            res.send({
                data: data,
                message: 'user profile got created!'
            });
        }).catch(err => {
            res.send(500).send({
                status: res.statusCode,
                message: err.message || `Some error occurred while creating the Profile`
            })
        })
};

// Fetch user profile by ID
exports.getUserProfileById = async (req, res) => {
    const id = req.params.id;

    SocialMediaModel.findById(id)
        .then((data) => {
            // validation
            if (!data) {
                return res.status(404).send({
                    status: res.statusCode,
                    data: data,
                    message: `No user profile exists with id: ${id}`
                })
            }

            res.status(200).send({
                status: res.statusCode,
                message: `data fetched successfully for userID: ${id}`,
                data: [data]
            })
        })
        .catch(err => {
            // please find out what this logic in if block is meant for?
            if (err.kind === 'ObjectID') {
                return res.status(400).send({
                    message: `data not found for user ID: ${id}`,
                    status: res.statusCode
                })
            }

            return res.status(500).send({
                message: `Error fetching data. Id: ${id}`,
                statusCode: res.statusCode
            })
        })
};
