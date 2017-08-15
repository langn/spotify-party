const mongoose = require('mongoose');
const partySchema = require('party.schema.server');
const partyModel = mongoose.model('PartyModel', partySchema);

partyModel.createParty = createParty;

module.exports = partyModel;

function createParty(party) {
    return partyModel.create(party);
}