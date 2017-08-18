const port = 3000;

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyCallbackURL = process.env.SPOTIFY_CALLBACK_URL;

module.exports.port = port;
module.exports.spotifyClientId = spotifyClientId;
module.exports.spotifyClientSecret = spotifyClientSecret;
module.exports.spotifyCallackURL = spotifyCallbackURL;
