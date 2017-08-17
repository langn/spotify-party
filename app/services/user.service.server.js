const userModel = require('../model/user.model.server');

module.exports.createUser = function(req, res) {
    const user = req.body;

    if (!user || !user.firstName || !user.lastName || !user.username || !user.password) {
        return res.sendStatus(400);
    }

    userModel.findUserByUsername(user.username).then((foundUser) => {
        if (foundUser) {
            return res.status(409).json('User with that username already exists');
        } else {
            return userModel.createUser(user)
                .then(() => {
                    return res.sendStatus(201);
                });
        }
    }).catch((error) => {
        console.error('Error creating user ' + error);
    });
};

module.exports.updateUser = function(req, res) {
    const user = req.body;

    userModel.updateUser(user._id, user)
        .then(() => {
            return res.sendStatus(204);
        }).catch((error) => {
            console.error('Error updating user ' + error);
            return res.sendStatus(500);
    });
};

module.exports.findUserByUsername = function(req, res) {
    const username = req.query.username;

    userModel.findUserByUsername(username)
        .then((user) => {
            if (!user) {
                return res.sendStatus(404);
            } else {
                return res.status(200).json(user);
            }
        }).catch((error) => {
            console.error('Error finding user ' + error);
            return res.sendStatus(500)
    })
};

module.exports.followUser = function(req, res) {
    const followingUserId = req.user._id;
    const userIdToFollow = req.body;

    userModel.followUser(followingUserId, userIdToFollow)
        .then(() => {
            return res.sendStatus(204)
        }).catch((error) => {
            console.error('Error following user ' + error);
            return res.sendStatus(500)
    });
};



