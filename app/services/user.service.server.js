const userModel = require('../model/user.model.server');

module.exports.createUser = function(req, res) {
    const user = req.body;

    if (!user || !user.firstName || !user.lastName || !user.username || !user.password) {
        return res.sendStatus(400);
    }

    userModel.findUserByUsername(user.username).then((foundUser) => {
        if (foundUser) {
            return res.status(409).json('User with that username already exists');
        } else {
            return userModel.createUser(user)
                .then(() => {
                    return res.sendStatus(201);
                });
        }
    }).catch((error) => {
        console.error('Error creating user ' + error);
    });
};



