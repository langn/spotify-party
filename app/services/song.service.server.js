const rp = require('request-promise-native');
const authController = require('./authentication.service.server');
const partyModel = require('../model/party.model.server');
const _ = require('lodash');

module.exports.searchSong = searchSong;
module.exports.getSongById = getSongById;
module.exports.voteSong = voteSong;

function searchSong(request, response) {
    //this will be removed in the future
    authController.authenticateClient()
        .then(function(accessToken) {
            const searchString = request.query.searchString;

            const searchSongOptions = {
                uri: 'https://api.spotify.com/v1/search',
                qs: {
                    q: 'track:' + searchString,
                    type: 'track'
                },
                method: 'GET',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + accessToken
                }
            };

            rp(searchSongOptions)
                .then(function(apiResponse) {
                    const parsedResponse = JSON.parse(apiResponse);
                    const songNameList = _.map(parsedResponse.tracks.items,
                        function(item) {
                            return {
                                title: item.name,
                                artist: item.artists[0].name,
                                trackId: item.id,
                                artUrl: item.album.images[2].url,
                            }
                        });
                    return response.status(200).json(songNameList);
                })
        });

}

function getSongById(request, response) {
    //this will be removed in the future
    authController.authenticateClient()
        .then(function(accessToken) {
            const trackId = request.params.trackId;

            const getSongOptions = {
                uri: 'https://api.spotify.com/v1/tracks/' + trackId,
                method: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + accessToken
                },
                json: true
            };

            rp(getSongOptions)
                .then(function(apiResponse) {
                    const simplifiedResponse = {
                        title: apiResponse.name,
                        album: apiResponse.album.name,
                        artist: apiResponse.artists[0].name,
                        artUrl: apiResponse.album.images[1].url,
                        duration: apiResponse.duration_ms
                    };
                    return response.status(200).json(simplifiedResponse);
                })
        });

}

function voteSong(req, res) {
    const user = req.user;
    const voteDir = req.params.direction;
    const partyId = req.params.partyId;
    const trackId = req.params.trackId;

    partyModel.voteSong(partyId, user._id, trackId, voteDir)
        .then((status) => {
            res.sendStatus(status);
        }).catch((errorStatus) => {
            console.error('Error voting for song ' + errorStatus);
            res.sendStatus(errorStatus);
    });
}

