const rp = require('request-promise-native');
const base64 = require('base-64');
const config = require('../config/config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
const userModel = require('../model/user.model.server');

module.exports.authenticateClient = authenticateClient;
module.exports.checkAuth = checkAuth;
module.exports.isUserAdmin = isUserAdmin;
module.exports.checkAdmin = checkAdmin;
module.exports.login = login;
module.exports.logout = logout;
module.exports.checkLogin = checkLogin;
module.exports.spotifySuccess = spotifySuccess;

passport.use(new LocalStrategy(localStrategy));
passport.use(new SpotifyStrategy({
        clientID: config.spotifyClientId,
        clientSecret: config.spotifyClientSecret,
        callbackURL: config.spotifyCallackURL
    }, function(accessToken, refreshToken, profile, done) {
        userModel.findOrCreateUserBySpotifyId(profile.id)
            .then((user) => {
                return done(null, user);
            }).catch((error) => {
            return done(error, null);
        });
    }
));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

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

function checkAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        res.sendStatus(401);
    } else {
        next();
    }
}

function isUserAdmin(req, res) {
    const user = req.user;
    if (!user) {
        res.status(401).json(false);
    }
    else if (user.role === 'ADMIN') {
        res.status(200).json(true);
    } else {
        res.status(401).json(false);
    }
}

function checkAdmin(req, res, next) {
    if (!req.isAuthenticated()) {
        res.sendStatus(401);
    } else if (req.user.role === 'ADMIN') {
        next();
    } else {
        res.sendStatus(401);
    }
}

function login(req, res) {
    const user = req.user;
    res.status(200).json(user);
}

function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
}

function checkLogin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel.findUserById(user._id)
        .then((user) => {
            done(null, user);
        }).catch((error) => {
        done(error, null);
    })
}

function localStrategy(username, password, done) {
    return userModel
        .findUserByCredentials(username, password)
        .then((user) => {
            if (!user) {
                return done(null, false);
            } else {
                return done(null, user);
            }}).catch((error) => {
            console.error('Error authenticating user ' + error);
            return done(error);
        });
}

function spotifySuccess(req, res) {
    const user = req.user;
    if (!user.username) {
        res.redirect('/#/profile');
    } else {
        res.redirect('/#/');
    }
}
