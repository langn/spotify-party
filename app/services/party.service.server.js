const partyModel = require('../model/party.model.server');

module.exports.createParty = function(req, res) {
    const party = req.body;
    partyModel.createParty(party)
        .then(function(response) {
            return res.status(201).json(response);
        }).catch(function(error) {
            console.error('Error creating party ' + error);
            return res.status(500);
    });
};