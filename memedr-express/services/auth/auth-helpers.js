const bcrypt = require('bcryptjs');
const User = require('../../models/user');

function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}

function createNewUser(req, res) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    return User.create({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        location: req.body.location,
        gender: req.body.gender,
        profile_image: req.body.profile_image,
        age: req.body.age
    });
}

function loginRedirect(req, res, next) {
    if (req.user) res.status(201).json({ message: "You're already logged in." });

    return next();
}

function loginRequired(req, res, next) {
    if (!req.user) res.status(403).json({ auth: false, message: "Please login." });

    return next();
}

module.exports = {
    comparePass,
    loginRedirect,
    loginRequired,
    createNewUser
}