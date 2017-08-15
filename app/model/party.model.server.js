const mongoose = require('mongoose');
const partySchema = require('./party.schema.server');
const partyModel = mongoose.model('PartyModel', partySchema);

partyModel.createParty = createParty;
partyModel.getPartyById = getPartyById;

module.exports = partyModel;

function createParty() {
    let mockSongs = [{title: 'Testerino'}];
    const mockHost = {firstName: 'Bob', lastName: 'Smith', spotifyId: 123, username: 'Bob', password: 'Secret123'};
    const party = {
        host: mockHost,
        songs: mockSongs
    };
    return partyModel.create(party);
}

function getPartyById(partyId) {
    return partyModel.findById(partyId);
}