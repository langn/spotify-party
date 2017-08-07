const express = require('express');
const songController = require('../controller/songController');
const router = express.Router();

router.get('/api/song/search', songController.searchSong);

module.exports = router;