const rp = require('request-promise-native');
const base64 = require('base-64');
const config = require('../config/config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../model/user.model.server');

passport.use(new LocalStrategy(localStrategy));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

module.exports.authenticateClient = function() {
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
};

module.exports.checkAuth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.sendStatus(401);
    } else {
        next();
    }
};

module.exports.login = function(req, res) {
    const user = req.user;
    res.status(200).json(user);
};

module.exports.logout = function(req, res) {
    req.logOut();
    res.sendStatus(200);
};

module.exports.loggedIn = function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
};

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

