const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');
const userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findOrCreateUserBySpotifyId = findOrCreateUserBySpotifyId;
userModel.findUserBySpotifyId = findUserBySpotifyId;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.updateUserAdmin = updateUserAdmin;
userModel.followUser = followUser;
userModel.getFollowedUsers = getFollowedUsers;
userModel.getFollowingUsers = getFollowingUsers;
userModel.getAllUsers = getAllUsers;
userModel.addFollowingUser = addFollowingUser;
userModel.deleteUserFromFollowing = deleteUserFromFollowing;
userModel.deleteUser = deleteUser;

module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findOrCreateUserBySpotifyId(spotifyId) {
    return userModel.findUserBySpotifyId(spotifyId)
        .then((user) => {
            if (!user) {
                const user = {
                    spotifyId: spotifyId,
                    username: spotifyId
                };
                return userModel.createUser(user);
            } else {
                return user;
            }
        }).catch((error) => {
            console.error('Error creating user with spotifyId ' + error);
        });
}

function findUserBySpotifyId(spotifyId) {
    return userModel.findOne({spotifyId: spotifyId});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserById(userId) {
    return userModel.findById(userId).populate('following');
}

function updateUser(userId, user) {
    return userModel.update(
        {_id: userId},
        {$set: {firstName: user.firstName, lastName: user.lastName}});
}

function updateUserAdmin(userId, user) {
    return userModel.update(
        {_id: userId},
        {$set: user});
}

function followUser(followingUserId, userIdToFollow) {
    return userModel.update(
        {_id: followingUserId},
        {$addToSet: {following: userIdToFollow}});
}

function addFollowingUser(followingUserId, userIdBeingFollowed) {
    return userModel.update(
        {_id: userIdBeingFollowed},
        {$addToSet: {followedBy: followingUserId}});
}

function getFollowedUsers(userId) {
    return userModel.findById(userId).populate('following');
}

function getFollowingUsers(userId) {
    return userModel.findById(userId).populate('followedBy');
}

function deleteUserFromFollowing(userId, followedUserId) {
    return userModel.update(
        {_id: userId},
        {$pull: {following: followedUserId}});
}

function deleteUser(userId) {
    return userModel.findOneAndRemove({_id: userId})
        .then((response) => {
            response.followedBy.forEach((user) => {
               userModel.deleteUserFromFollowing(user._id, userId);
            });
        }).catch((error) => {
            console.error('Error deleting user ' + error);
        });
}

function getAllUsers() {
    return userModel.find();
}

