const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    title: String,
    artist: String,
    album: String,
    artUrl: String,
    votes: Number
});

module.exports = songSchema;