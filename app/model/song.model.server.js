const mongoose = require('mongoose');
const songSchema = require('./song.schema.server');
const songModel = mongoose.model('SongModel', songSchema);

module.exports = songModel;
