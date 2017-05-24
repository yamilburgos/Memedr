var express = require('express');
var router = express.Router();
var db = require('../db/queries');

const authHelpers = require('../services/auth/auth-helpers');

router.get('/', function (req, res, next) {
  res.render('index');
});

// SUCCESSFULLY LOGGING IN
// SEND USER PROFILE JSON
router.get('/success', function(req, res, next){
  res.status(201).json({ user_profile: req.user, auth: true });
});

// FAILED TO LOG IN
// SET AUTH TO FALSE
router.get('/failure', function(req, res, next){
  res.status(403).json({ auth: false });
});

// SUCCESSFULLY REGISTERED
// SEND USER PROFILE JSON
// SPIT BACK A JSON OBJECT WITH REGISTERED USERS LOGIN INFORMATION
// SEND AUTH "TRUE" TO SET STATE ON REACT
router.get('/registered', authHelpers.loginRequired, function(req, res, next){
  res.status(201).json({ user_profile: req.user, auth: true });
});

// WILDCARD
// REDIRECT TO REACT BUILD FOLDER
/*router.get('*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});*/

module.exports = router;