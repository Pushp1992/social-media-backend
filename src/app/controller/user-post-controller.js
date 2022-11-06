
const UserPostModel = require('../model/user-post-model');

// Create Post
exports.createPost = async (req, res) => {
    const REQUEST_BODY = req.body;

    // validate request body
    if (!REQUEST_BODY || !req.body.content) {
        return res.status(400).send({
            code: res.statusCode,
            message: res.statusMessage || `post content can not be empty`
        });
    }

    createPost(REQUEST_BODY, res);
};

const createPost = async (data, res) => {
    const {
        id,
        content,
        image_url,
        email,
        created_by,
        creation_date,
        like_count
    } = data;

    const post = new UserPostModel({
        _id: id,
        content: content,
        image_url: image_url,
        email: email,
        created_by: created_by,
        creation_date: creation_date,
        like_count: like_count
    });

    // save post in databse
    post.save()
        .then(data => {
            res.send({
                code: res.statusCode,
                message: 'post got created!',
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                code: res.statusCode,
                message: err.message || `Some error occurred while creating post`
            })
        })
};

// Fetch all Posts
exports.getPost = async (req, res) => {
    // Make sure to give proper API response when trying to fetch empty post list.

    // TO-DO: Logic to get all post using query params
    console.log(req.query);

    await UserPostModel.find()
        .then(data => {
            // validation
            try {
                if (!data || !data.length) {
                    return res.status(204).send({
                        data: data || {},
                        code: res.statusCode,
                        message: `post list is empty`
                    })
                }

                return res.status(200).send({
                    count: data.length,
                    code: res.statusCode,
                    message: 'post list fetched successfully',
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
                message: `${err.message} || unable to fetch post`,
            })
        })
};

// Fetch Post by ID
exports.getPostById = async (req, res) => {
    const id = req.params.id;

    UserPostModel.findById(id)
        .then((data) => {

            // validation
            if (!data) {
                return res.status(404).send({
                    code: res.statusCode,
                    data: data,
                    message: `No post exists with id: ${id}`
                })
            }

            res.status(200).send({
                code: res.statusCode,
                message: `post fetched successfully. ID: ${id}`,
                data: data
            })
        })
        .catch(err => {
            if (err.kind === 'ObjectID') {
                return res.status(400).send({
                    message: `data not found for Post ID: ${id}`,
                    code: res.statusCode
                })
            }

            return res.status(500).send({
                message: `Error fetching data. Id: ${id}`,
                statusCode: res.statusCode
            })
        })
};

// Update Post by Id
exports.updatePostById = async (req, res) => {
    const REQUEST_BODY = req.body;
    const post_id = req.params.id;

    // validate request
    if (!req.body.content || !req.body.id) {
        return res.status(400).send({
            message: `Please make sure content and ID field are not empty`
        })
    }

    const {
        id,
        content,
        image_url,
        email,
        created_by,
        creation_date,
        like_count
    } = REQUEST_BODY;

    // find profile and update it
    UserPostModel.findByIdAndUpdate(post_id, {
        _id: id,
        content: content,
        image_url: image_url,
        email: email,
        created_by: created_by,
        creation_date: creation_date,
        like_count: like_count
    },
        { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    code: res.statusCode,
                    message: `post with ID: ${post_id} is not found in DB`
                })
            }

            res.status(200).send({
                code: res.statusCode,
                message: `Post with ID: ${post_id} updated successfully!`,
                data: data
            })
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Post not found with id " + post_id
                });
            }

            return res.status(500).send({
                message: "Error updating Post with id " + post_id
            });
        })
};

// Delete post by ID
exports.deletePostById = async (req, res) => {
    const ID = req.params.id;

    UserPostModel.findByIdAndRemove(ID)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "Post not found with id " + ID
                });
            }
            return res.status(200).send({
                code: res.statusCode,
                message: `Post with ID: ${ID} deleted successfully!`
            })
        }).catch(err => {
            return res.status(500).send({
                code: res.statusCode,
                message: `${err.message} || unable to delete Post. ID - ${ID}`
            })
        })
};

// Delete all Post
exports.deletePost = async (req, res) => {
    UserPostModel.remove()
        .then(() => {
            return res.status(200).send({
                code: res.statusCode,
                message: `Post list deleted successfully!`
            })
        }).catch(err => {
            return res.status(500).send({
                code: res.statusCode,
                message: `${err.message} || unable to delete Post. ID - ${ID}`
            })
        })
};