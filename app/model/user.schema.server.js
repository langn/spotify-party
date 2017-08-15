const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    spotifyAccessToken: String,
    spotifyUsername: String
}, {collection: 'user'});

module.exports = userSchema;