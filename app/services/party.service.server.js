const partyModel = require('../model/party.model.server');

module.exports.createParty = function(req, res) {

    partyModel.createParty()
        .then(function(response) {
            return res.status(201).json(response);
        }).catch(function(error) {
            console.error('Error creating party ' + error);
            return res.sendStatus(500);
    });
};

module.exports.getPartyById = function(req, res) {
    partyModel.getPartyById(req.params.partyId)
        .then(function(response) {
            if (!response) {
                return res.sendStatus(404);
            }
            return res.status(200).json(response);
        }).catch(function(error) {
            console.error('Error getting party ' + error);
            return res.sendStatus(500);
    });
};