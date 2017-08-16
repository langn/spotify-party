const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    title: String,
    artist: String,
    album: String,
    artUrl: String,
    votes: {type: Number, default: 1},
    trackId: String
});

module.exports = songSchema;