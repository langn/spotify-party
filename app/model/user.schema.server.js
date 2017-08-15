const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    first: String,
    last: String,
    spotifyAccessToken: String,
    spotifyUsername: String
}, {collection: 'user'});

module.exports = userSchema;