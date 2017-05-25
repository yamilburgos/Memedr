var express = require('express');
var router = express.Router();
var secureRouter = express.Router();
var db = require('../db/queries');

const authHelpers = require('../services/auth/auth-helpers');

router.get('/', function (req, res, next) {
  res.render('index', { title: "Memedr" } );
});

// SUCCESSFULLY LOGGING IN
// SEND USER PROFILE JSON
router.get('/success', function(req, res, next){
  res.status(201).send({ user_profile: req.user, loggedIn: true });
});

// FAILED TO LOG IN
// SET AUTH TO FALSE
router.get('/failure', function(req, res, next){
  res.status(403).json({ loggedIn: false });
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

// GET ALL USERS WITH SAVES
router.get('/users/withSaves', db.getUsersWithSaves);

// ADMINISTRATION
// DELETE MEME FROM API_CACHE TABLE
router.delete('/meme/:id', db.deleteMemeFromCache);

// NULL A USER
// WHEN A USER DELETES THEIR PROFILE, INSTEAD OF DELETED FROM USERS TABLE, WE NULL THEIR PROFILE
// AND ALSO MAKE IT INACTIVE
router.put('/users/nully/:id', db.nullyAUser);

// SAVE A MEME TO A USER PROFILE
// WHEN THE CHECK IS CLICKED
router.post('/users/profile/save/:id', db.saveToProfile);

// DELETE A MEME FROM A USER PROFILE
// WHEN THE X IS CLICKED
router.delete('/users/profile/delete/saved/:id', db.deleteFromProfile);

// UPDATE A USERS PROFILE
router.put('/users/profile/update/:id', db.updateProfile);

// THIS ROUTE IS RESPONSIBLE FOR CALLING THE MEME API
// THIS ROUTE WILL INSERT MEMES FROM AXIOS CALL INTO API_CACHE TABLE
router.get('/requestAPI', db.requestAPI);

module.exports = router;