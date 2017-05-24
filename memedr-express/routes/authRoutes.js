const express = require('express');
const router = express.Router();

const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');

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

router.post('/login', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/failure',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.json({
    auth: false
  });
});

module.exports = router;