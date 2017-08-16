const express = require('express');
const userService = require('../services/user.service.server');
const songService = require('../services/song.service.server');
const partyService = require('../services/party.service.server');
const router = express.Router();

router.post('/api/user', userService.createUser);

router.post('/api/party', partyService.createParty);
router.get('/api/party/:partyId', partyService.getPartyById);
router.put('/api/party/:partyId/add-song', partyService.addSongToParty);

router.get('/api/song/search', songService.searchSong);
router.get('/api/song/:trackId', songService.getSongById);

module.exports = router;