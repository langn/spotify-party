const UserModel = require('./user.model.server');
const mongoose = require('mongoose');

const userToScoreSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    vote: {type: Number, min: -1, max: 1}
});

const songSchema = mongoose.Schema({
    title: String,
    artist: String,
    album: String,
    artUrl: String,
    votes: {type: Number, default: 1},
    usersToScore: [{type: userToScoreSchema}],
    trackId: String
});


module.exports = songSchema;