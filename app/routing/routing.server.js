const express = require('express');
const userService = require('../services/user.service.server');
const songService = require('../services/song.service.server');
const partyService = require('../services/party.service.server');
const authService = require('../services/authentication.service.server');
const router = express.Router();
const passport = require('passport');

router.post('/api/user', userService.createUser);
router.post('/api/adminCreateUser', authService.checkAdmin, userService.adminCreateUser);
router.put('/api/user', authService.checkAuth, userService.updateUser);
router.put('/api/user/:userId', authService.checkAdmin, userService.updateUserAdmin);
router.get('/api/user', userService.findUserByUsername);
router.delete('/api/user/:userId', authService.checkAdmin, userService.deleteUser);
router.get('/api/getAllUsers', authService.checkAdmin, userService.getAllUsers);
router.get('/api/user/:userId', authService.checkAdmin, userService.getUserById);
router.put('/api/followUser/:userId', authService.checkAuth, userService.followUser);
router.get('/api/followingUsers', authService.checkAuth, userService.getFollowedUsers);
router.post('/api/login', passport.authenticate('local'), authService.login);
router.post('/api/logout', authService.logout);
router.get('/api/checkLogin', authService.checkLogin);
router.get('/api/checkAdmin', authService.isUserAdmin);

router.post('/api/party', authService.checkAuth, partyService.createParty);
router.get('/api/party', authService.checkAuth, partyService.getPartiesForUser);
router.get('/api/party/:partyId', partyService.getPartyById);
router.get('/api/party/song/:trackId', partyService.getPartiesWithSong);
router.put('/api/party/:partyId/song/:trackId/vote/:direction', authService.checkAuth, songService.voteSong);
router.put('/api/party/:partyId/add-song', partyService.addSongToParty);

router.get('/api/song/search', songService.searchSong);
router.get('/api/song/:trackId', songService.getSongById);


module.exports = router;