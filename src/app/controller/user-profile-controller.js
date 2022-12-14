
const UserProfileModel = require('../model/user-profile-model');

// Create user profile
exports.createUserProfile = async (req, res) => {
    const REQUEST_BODY = req.body;

    // validate request body
    if (!REQUEST_BODY || !req.body.email) {
        return res.status(400).send({
            code: res.statusCode,
            message: res.statusMessage || `payload or email cannot be empty`
        });
    }

    createProfile(REQUEST_BODY, res);
};

const createProfile = async (data, res) => {
    const {
        id,
        name,
        email,
        image_url,
        gender,
        age,
        DOB,
        location,
        mobile,
        bio,
        profile_creation_date
    } = data;

    // create profile
    const profile = new UserProfileModel({
        _id: id,
        name: name,
        email: email,
        image_url: image_url,
        gender: gender,
        age: age,
        DOB: DOB,
        location: location,
        mobile: mobile,
        bio: bio,
        profile_creation_date: profile_creation_date
    });

    // save profile in databse
    profile.save()
        .then(data => {
            res.send({
                code: res.statusCode,
                message: 'user profile got created!',
                data: data
            });
        }).catch(err => {
            res.status(500).send({
                code: res.statusCode,
                message: err.message || `Some error occurred while creating the Profile`
            })
        })
};

// Fetch user profile by ID
exports.getUserProfileById = async (req, res) => {
    const id = req.params.id;

    UserProfileModel.findById(id)
        .then((data) => {
            // validation
            if (!data) {
                return res.status(404).send({
                    code: res.statusCode,
                    data: data,
                    message: `No user profile exists with id: ${id}`
                })
            }

            res.status(200).send({
                code: res.statusCode,
                message: `data fetched successfully for userID: ${id}`,
                data: data
            })
        })
        .catch(err => {
            // please find out what this logic in if block is meant for?
            if (err.kind === 'ObjectID') {
                return res.status(400).send({
                    message: `data not found for user ID: ${id}`,
                    code: res.statusCode
                })
            }

            return res.status(500).send({
                message: `Error fetching data. Id: ${id}`,
                statusCode: res.statusCode
            })
        })
};

// Fetch all User Profile
exports.getUserProfile = async (req, res) => {
    // Make sure to give proper API response when trying to fetch empty user profile list.

    await UserProfileModel.find()
        .then(data => {
            // validation
            try {
                if (!data || !data.length) {
                    return res.status(204).send({
                        data: data || {},
                        code: res.statusCode,
                        message: `profile list is empty`
                    })
                }

                return res.status(200).send({
                    count: data.length,
                    code: res.statusCode,
                    message: 'profile list fetched successfully',
                    data: data
                })
            } catch (err) {
                return res.status(404).send({
                    message: 'error'
                })
            }
        }).catch(err => {
            return res.status(500).send({
                code: res.statusCode,
                message: `${err.message} || unable to fetch user profile`,
            })
        })
};

// Update user profile by Id
exports.updateUserProfileById = async (req, res) => {
    const REQUEST_BODY = req.body;
    const profile_id = req.params.id;

    // validate request
    if (!req.body.email || !req.body.id) {
        return res.status(400).send({
            message: `Please make sure email and ID field are not empty`
        })
    }

    const {
        id,
        name,
        email,
        image_url,
        gender,
        age,
        DOB,
        location,
        mobile,
        bio,
        profile_creation_date
    } = REQUEST_BODY;

    // find profile and update it
    UserProfileModel.findByIdAndUpdate(profile_id, {

        _id: id,
        name: name,
        email: email,
        image_url: image_url,
        gender: gender,
        age: age,
        DOB: DOB,
        location: location,
        mobile: mobile,
        bio: bio,
        profile_creation_date: profile_creation_date
    },
        { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    code: res.statusCode,
                    message: `profile with ID: ${profile_id} is not found in DB`
                })
            }

            res.status(200).send({
                code: res.statusCode,
                message: `User profile with ID: ${profile_id} updated successfully!`,
                data: data
            })
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Profile not found with id " + profile_id
                });
            }

            return res.status(500).send({
                message: "Error updating Profile with id " + profile_id
            });
        })
};

// Delete user profile by ID
exports.deleteUserProfileById = async (req, res) => {
    const ID = req.params.id;

    UserProfileModel.findByIdAndRemove(ID)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "user Profile not found with id " + ID
                });
            }
            return res.status(200).send({
                code: res.statusCode,
                message: `User Profile with ID: ${ID} deleted successfully!`
            })
        }).catch(err => {
            return res.status(500).send({
                code: res.statusCode,
                message: `${err.message} || unable to delete user profile. ID - ${ID}`
            })
        })
};

// Delete all user profile
exports.deleteUserProfile = async (req, res) => {
    UserProfileModel.remove()
        .then(() => {
            return res.status(200).send({
                code: res.statusCode,
                message: `User Profile list deleted successfully!`
            })
        }).catch(err => {
            return res.status(500).send({
                code: res.statusCode,
                message: `${err.message} || unable to delete user profile. ID - ${ID}`
            })
        })
};
