const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');
const userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.followUser = followUser;
userModel.getFollowedUsers = getFollowedUsers;
userModel.getAllUsers = getAllUsers;

module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function updateUser(userId, user) {
    return userModel.update(
        {_id: userId},
        {$set: {firstName: user.firstName, lastName: user.lastName}});
}

function followUser(followingUserId, userIdToFollow) {
    return userModel.update(
        {_id: followingUserId},
        {$addToSet: {following: userIdToFollow}});
}

function getFollowedUsers(userId) {
    return userModel.findById(userId).populate('following');
}

function getAllUsers() {
    return userModel.find();
}