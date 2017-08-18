const mongoose = require('mongoose');
const UserModel = require('./user.model.server');
const SongModel = require('./song.model.server');
const shortid = require('shortid');

const partySchema = new mongoose.Schema({
    _id : {
        type: String,
        'default': shortid.generate
    },
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    songs: {type: [SongModel.schema], default: []},
    host: {type: UserModel.schema},
    createdDate: {type: Date, default: Date.now}
}, {collection: "party"});

module.exports = partySchema;
