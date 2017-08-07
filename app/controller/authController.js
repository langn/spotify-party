const rp = require('request-promise-native');
const base64 = require('base-64');
const config = require('../config/config');

function authenticateClient() {
    const authHeaderEncoded = base64.encode(config.spotifyClientId + ':' + config.spotifyClientSecret);

    const requestOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            grant_type : 'client_credentials'
        },
        headers : {
            'Authorization' : 'Basic ' + authHeaderEncoded
        }
    };

    return rp.post(requestOptions)
        .then(function (response) {
            const parsedResponse = JSON.parse(response);
            return parsedResponse.access_token;
        }).catch(function (error) {
            console.error('Issue obtaining Spotify client token' + error);
    });
}

module.exports.authenticateClient = authenticateClient;
