const express = require('express');
const router = express.Router();

const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');

router.post('/register', (req, res, next) => {

  authHelpers.createNewUser(req, res).then((user) => {
    req.login(user, (err) => {

      if (err) return next(err);

      // SPIT BACK A JSON OBJECT WITH REGISTERED USERS LOGIN INFORMATION
      // SEND AUTH "TRUE" TO SET STATE ON REACT
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
      error: 'Registration Error',
      message: 'Common Issues: Username is taken, Email is taken, or younger than 18.',
    });
  });
});

// WORKS!!!
// NEED TO FIGURE OUT SUCCESS AND FAILURE REDIRECTS
router.post('/login', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/failure',
  failureFlash: true
  
}), (req, res, next) => { console.log("login"); });

// WORKS!!
// SENDS AUTH "FALSE" BACK TO REACT TO SWITCH STATE OF A LOGGED IN USER
router.get('/logout', (req, res) => {
  req.logout();
  res.json({
    auth: false
  });
});

module.exports = router;