const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: {type: String, select: false},
    firstName: String,
    lastName: String,
    spotifyAccessToken: {type: String, select: false},
    spotifyUsername: {type: String, select: false},
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}]
}, {collection: 'user'});

module.exports = userSchema;