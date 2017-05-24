var express = require('express');
var router = express.Router();
var db = require('../db/queries');

const authHelpers = require('../services/auth/auth-helpers');

router.get('/', function (req, res, next) {
  res.render('index', { title: "Memedr" } );
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

// WILDCARD
// REDIRECT TO REACT BUILD FOLDER
/*router.get('*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});*/



/*
* ROUTES TO QUERY THE DATABASE
*/

// THIS ROUTE IS RESPONSIBLE FOR GETTING THE MEMES FROM THE API_CACHE TABLE
router.get('/getMemes', db.getMemes);

// THIS ROUTE IS RESPONSIBLE FOR CALLING THE GIPHY API
// THIS IS WHERE AXIOS LIVES
// THIS ROUTE WILL INSERT MEMES FROM AXIOS CALL INTO API_CACHE TABLE
router.get('/requestAPI', db.requestAPI);

// ADMINISTRATION
// DELETE MEME FROM API_CACHE TABLE
router.delete('/meme/:id', db.deleteMemeFromCache);

// SAVE A MEME TO A USER PROFILE
// WHEN THE CHECK IS CLICKED
router.put('/save/profile/:id', db.saveToProfile);

// GET ALL USERS WITH SAVES
router.get('/users/withsaves', db.getUsersWithSaves);

// NULL A USER
// WHEN A USER DELETES THEIR PROFILE, INSTEAD OF DELETED FROM USERS TABLE, WE NULL THEIR PROFILE
// AND ALSO MAKE IT INACTIVE
router.put('/users/nully/:id', db.nullyAUser);

module.exports = router;