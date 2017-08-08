const express = require('express');
const songController = require('../controller/songController');
const router = express.Router();

router.get('/api/song/search', songController.searchSong);
router.get('/api/song/:trackId', songController.getSongById);

module.exports = router;