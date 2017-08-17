const mongoose = require('mongoose');
const partySchema = require('./party.schema.server');
const partyModel = mongoose.model('PartyModel', partySchema);

partyModel.createParty = createParty;
partyModel.getPartyById = getPartyById;
partyModel.addSongToParty = addSongToParty;

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