const mongoose = require('mongoose');
const partySchema = require('./party.schema.server');
const partyModel = mongoose.model('PartyModel', partySchema);
const _ = require('lodash');
const q = require('q');

partyModel.createParty = createParty;
partyModel.getPartyById = getPartyById;
partyModel.addSongToParty = addSongToParty;
partyModel.addUserToParty = addUserToParty;
partyModel.voteSong = voteSong;

module.exports = partyModel;

function createParty(host) {
    const party = {
        host: host,
    };
    return partyModel.create(party);
}

function getPartyById(partyId) {
    return partyModel.findById(partyId);
}

function addSongToParty(partyId, song) {
    return partyModel.update(
        {_id: partyId},
        {$push: {songs: song}});
}

function addUserToParty(user, partyId) {
    return partyModel.update(
        {_id: partyId},
        {$push: {users: user._id}});
}

function voteSong(partyId, userId, trackId, direction) {
    let deferred = q.defer();
    partyModel.findById(partyId)
        .then((party) => {
            const songIndex = _.findIndex(party.songs, {trackId: trackId});
            if (songIndex === -1) {
                deferred.reject(404);
            }
            else if (_.findIndex(party.songs[songIndex].usersToScore.toObject(), {user: userId}) !== -1) {
                deferred.reject(403);
            }
            else if (direction === 'UP') {
                party.songs[songIndex].votes += 1;
                party.songs[songIndex].usersToScore.push({user: userId, vote: 1});
                party.save().then(() => {
                    deferred.resolve(200);
                });
            } else {
                party.songs[songIndex].votes -= 1;
                party.songs[songIndex].usersToScore.push({user: userId, vote: -1});
                party.save().then(() => {
                    deferred.resolve(200);
                });
            }}).catch(() => {
                deferred.reject(500);
            });
    return deferred.promise;
}
