const partyModel = require('../model/party.model.server');

module.exports.createParty = createParty;
module.exports.getPartyById = getPartyById;
module.exports.addSongToParty = addSongToParty;
module.exports.getPartiesForUser = getPartiesForUser;
module.exports.getPartiesWithSong = getPartiesWithSong;

function createParty(req, res) {
    const host = req.user;

    partyModel.createParty(host)
        .then(function(response) {
            return res.status(201).json(response);
        }).catch(function(error) {
            console.error('Error creating party ' + error);
            return res.sendStatus(500);
    });
}

function getPartyById(req, res) {
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
}

function addSongToParty(req, res) {
    partyModel.addSongToParty(req.params.partyId, req.body)
        .then(function() {
            return res.sendStatus(204);
        }).catch((error) => {
            console.error('Error adding song to party ' + error);
            return res.sendStatus(500);
    });
}

function getPartiesForUser(req, res) {
    partyModel.getPartiesForUser(req.user)
        .then(function(parties) {
            return res.status(200).json(parties);
        }).catch((error) => {
            console.error('Error getting parties for user ' + error);
            return res.sendStatus(500);
    })
}

function getPartiesWithSong(req, res) {
    const trackId = req.params.trackId;
    partyModel.getPartiesWithSong(trackId)
        .then((parties) => {
            return res.status(200).json(parties);
        }).catch((error) => {
            console.error('Error getting parties with trackId ' + error);
            return res.sendStatus(500);
    });

}