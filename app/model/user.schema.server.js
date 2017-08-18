const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: {type: String, select: false},
    firstName: String,
    lastName: String,
    role: {type: String, enum: ['USER', 'ADMIN'], default: 'USER'},
    spotifyAccessToken: {type: String, select: false},
    spotifyUsername: {type: String, select: false},
    spotifyId: String,
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    followedBy: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}]
}, {collection: 'user'});

module.exports = userSchema;