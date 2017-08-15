const mongoose = require('mongoose');
const UserModel = require('./user.model.server');
const SongModel = require('./song.model.server');

const partySchema = new mongoose.Schema({
    users: [UserModel.schema],
    songs: [SongModel.schema],
    host: {type: UserModel.schema}
}, {collection: "party"});

module.exports = partySchema;
