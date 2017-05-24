const express = require('express');
const router = express.Router();

const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');

// REGISTER ROUTE
router.post('/register', (req, res, next) => {

  authHelpers.createNewUser(req, res).then((user) => {
    req.login(user, (err) => {

      if (err) return next(err);

      res.redirect('/registered');

    });
  }).catch((err) => {
    res.status(500).json({
      error: 'Registration Error',
      message: 'Common Issues: Username is taken, Email is taken, or younger than 18.',
    });
  });
});

// LOGIN ROUTE
router.post('/login', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/failure',
  failureFlash: true
}));

// LOGOUT ROUTE
router.get('/logout', (req, res) => {
  req.logout();
  res.status(403).json({
    auth: false
  });
});

module.exports = router;