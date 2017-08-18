const userModel = require('../model/user.model.server');

module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.findUserByUsername = findUserByUsername;
module.exports.followUser = followUser;
module.exports.getFollowedUsers = getFollowedUsers;
module.exports.getAllUsers = getAllUsers;

function createUser(req, res) {
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
}

function updateUser(req, res) {
    const user = req.body;

    userModel.updateUser(user._id, user)
        .then(() => {
            return res.sendStatus(204);
        }).catch((error) => {
            console.error('Error updating user ' + error);
            return res.sendStatus(500);
    });
}

function findUserByUsername(req, res) {
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
}

function followUser(req, res) {
    const followingUserId = req.user._id;
    const userIdToFollow = req.params.userId;

    userModel.followUser(followingUserId, userIdToFollow)
        .then(() => {
            return res.sendStatus(204)
        }).catch((error) => {
            console.error('Error following user ' + error);
            return res.sendStatus(500)
    });
}

function getFollowedUsers(req, res) {
    const user = req.user;

    userModel.getFollowedUsers(user._id)
        .then((response) => {
            return res.status(200).json(response);
        }).catch((error) => {
            console.error('Error getting followed users ' + error);
            return res.sendStatus(500);
    })
}

function getAllUsers(req, res) {
    userModel.getAllUsers()
        .then((response) => {
            return res.status(200).json(response);
        }).catch((error) => {
            console.error('Error getting all users ' + error);
            return res.sendStatus(500);
    });
}



