const express = require('express');
const router = express.Router();

const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');

// REGISTER ROUTE
router.post('/register', (req, res, next) => {

  authHelpers.createNewUser(req, res).then((user) => {
    req.login(user, (err) => {

      if (err) return next(err);

      // SUCCESSFULLY REGISTERED
      // SEND USER PROFILE JSON
      // SPIT BACK A JSON OBJECT WITH REGISTERED USERS INFORMATION
      // SEND AUTH "TRUE" TO SET STATE ON REACT
      res.status(201).json({ 
        user_profile: {
          username: req.body.username,
          email: req.body.email,
          location: req.body.location,
          gender: req.body.gender,
          profile_image: req.body.profile_image,
          age: req.body.age
        }, 
        loggedIn: true });

    });
  }).catch((err) => {
    res.status(500).json({
      error: 'Registration Error',
      message: 'Common Issues: Username is taken, Email is taken, or younger than 18.',
    });
  });
});

// LOGIN ROUTE
/*router.post('/login', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/failure',
  failureFlash: true
}));*/

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.status(201).send({ user_profile: req.user, loggedIn: true });
  });

// LOGOUT ROUTE
router.get('/logout', (req, res) => {
  req.logout();
  res.status(403).json({
    loggedIn: false
  });
});

module.exports = router;