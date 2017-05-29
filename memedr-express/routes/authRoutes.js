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
      res.status(201).json({ user_profile: req.user, loggedIn: true }); });
  }).catch((err) => {
    res.status(200).json({
      error: 'Registration Error',
      message: 'Registration Error: Please try again.',
    });
  });
});

// LOGIN ROUTE
router.post('/login',
  passport.authenticate('local', { failWithError: true }),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.status(201).send({ user_profile: req.user, loggedIn: true });
  },
  function(err, req, res, next) {
    // handle error
    if (err) { return res.status(200).send({ status: "Invalid Credentials", loggedIn: false }); }
  });

// LOGOUT ROUTE
router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({
    loggedIn: false
  });
});

module.exports = router;