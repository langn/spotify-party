const rp = require('request-promise-native');
const authController = require('./authController');
const _ = require('lodash');

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
                                name: item.name,
                                artist: item.artists[0].name,
                                album: item.album.name
                            }
                        });
                    response.status(200).json(songNameList);
                })
        });

}

module.exports.searchSong = searchSong;