const mongoose = require('mongoose');
const partySchema = require('party.schema.server');
const partyModel = mongoose.model('PartyModel', partySchema);

module.exports = partyModel;