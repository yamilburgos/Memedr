const express = require('express');
const router = express.Router();

const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');

router.post('/register', (req, res, next) => {

  authHelpers.createNewUser(req, res).then((user) => {
    req.login(user, (err) => {

      if (err) return next(err);

      // LOGGED REGISTERED USE NEEDS AUTH "TRUE" ON REACT STATE
      res.json({
        user_profile: {
          username: req.body.username,
          id: req.body.userid,
          email: req.body.email,
          location: req.body.location,
          gender: req.body.gender,
          profile_image: req.body.profile_image,
          age: req.body.age
        },
        auth: true
      });

    });
  }).catch((err) => {
    res.status(500).json({
      status: 'Registration Error: Username or Email already in use.'
    });
  });
});

// WORKS!!!
// NEED TO FIGURE OUT SUCCESS AND FAILURE REDIRECTS
router.post('/login', passport.authenticate('local', {
  successRedirect: 'http://www.google.com/',
  failureRedirect: 'http://www.amazon.com/',
  failureFlash: true
}), (req, res, next) => {});

// WORKS!!
// SENDS AUTH "FALSE" BACK TO REACT TO SWITCH STATE OF A LOGGED IN USER
router.get('/logout', (req, res) => {
  req.logout();
  res.json({
    auth: false
  });
});

module.exports = router;