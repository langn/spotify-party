const express = require('express');
const userService = require('../services/user.service.server');
const songService = require('../services/song.service.server');
const partyService = require('../services/party.service.server');
const authService = require('../services/authentication.service.server');
const router = express.Router();
const passport = require('passport');

router.post('/api/user', userService.createUser);
router.put('/api/user', authService.checkAuth, userService.updateUser);
router.get('/api/user', userService.findUserByUsername);
router.put('/api/user/follow/:userId', authService.checkAuth, userService.followUser);
router.get('/api/user/following', authService.checkAuth, userService.getFollowedUsers);
router.post('/api/login', passport.authenticate('local'), authService.login);
router.post('/api/logout', authService.logout);
router.get('/api/checkLogin', authService.checkLogin);

router.post('/api/party', authService.checkAuth, partyService.createParty);
router.get('/api/party', authService.checkAuth, partyService.getPartiesForUser);
router.get('/api/party/:partyId', partyService.getPartyById);
router.put('/api/party/:partyId/song/:trackId/vote/:direction', authService.checkAuth, songService.voteSong);
router.put('/api/party/:partyId/add-song', partyService.addSongToParty);

router.get('/api/song/search', songService.searchSong);
router.get('/api/song/:trackId', songService.getSongById);


module.exports = router;