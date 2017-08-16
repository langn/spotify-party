const mongoose = require('mongoose');
const partySchema = require('./party.schema.server');
const partyModel = mongoose.model('PartyModel', partySchema);

partyModel.createParty = createParty;
partyModel.getPartyById = getPartyById;
partyModel.addSongToParty = addSongToParty;

module.exports = partyModel;

function createParty() {
    const mockHost = "599396d0b43dc3f31576049e";
    const party = {
        host: mockHost,
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