const partyModel = require('../model/party.model.server');

module.exports.createParty = function(req, res) {
    const host = req.user;

    partyModel.createParty(host)
        .then(function(response) {
            return res.status(201).json(response);
        }).catch(function(error) {
            console.error('Error creating party ' + error);
            return res.sendStatus(500);
    });
};

module.exports.getPartyById = function(req, res) {
    const user = req.user;

    partyModel.getPartyById(req.params.partyId)
        .then(function(response) {
            if (!response) {
                return res.sendStatus(404);
            }
            if (user) {
                partyModel.addUserToParty(user, req.params.partyId)
                .then(() => {
                    return res.status(200).json(response);
                });
            } else {
                return res.status(200).json(response);
            }
        }).catch(function(error) {
            console.error('Error getting party ' + error);
            return res.sendStatus(500);
    });
};

module.exports.addSongToParty = function(req, res) {
    partyModel.addSongToParty(req.params.partyId, req.body)
        .then(function() {
            return res.sendStatus(204);
        }).catch((error) => {
            console.error('Error adding song to party ' + error);
            return res.sendStatus(500);
    });
};

module.exports.getPartiesForUser = function(req, res) {
    partyModel.getPartiesForUser(req.user)
        .then(function(parties) {
            return res.status(200).json(parties);
        }).catch((error) => {
            console.error('Error getting parties for user ' + error);
            return res.sendStatus(500);
    })
};