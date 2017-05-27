var express = require('express');
var router = express.Router();
var secureRouter = express.Router();
var db = require('../db/queries');

const authHelpers = require('../services/auth/auth-helpers');

router.get('/', function (req, res, next) {
  res.render('index', { title: "Memedr App" } );
});

/*
* GET ROUTES
*/

// THIS ROUTE IS RESPONSIBLE FOR CALLING THE MEME API
// THIS ROUTE WILL INSERT MEMES FROM AXIOS CALL INTO API_CACHE TABLE
router.get('/requestAPI', db.requestAPI);

// THIS ROUTE IS RESPONSIBLE FOR GETTING THE MEMES FROM THE API_CACHE TABLE
router.get('/getMemes', db.getMemes);

// GET ALL USERS WITH LIKES
router.get('/users/withLikes', db.getUsersWithLikes);

// THIS ROUTE WILL GET THE SUBTITLES
router.get('/getSubtitles', db.getSubTitles);

// THIS ROUTE WILL MATCH USERS WITH THE SAME LIKED MEME
router.get('/users/profile/matches/:id', db.getMyMatches);

/*
* DELETE ROUTES
*/

// ADMINISTRATION
// DELETE MEME FROM API_CACHE TABLE
router.delete('/meme/:id', db.deleteMemeFromCache);

// DELETE A USER
// IF A USER DECIDES TO DELETE THEIR ACCOUNT
router.delete('/users/profile/delete/:id', db.deleteAccount);

// DELETE A MEME FROM A USER PROFILE
// WHEN THE X IS CLICKED
router.delete('/users/profile/remove/like/:id', db.deleteFromProfile);

/*
* POST ROUTES
*/

// LIKE A MEME TO A USER PROFILE
// WHEN THE LIKE IS CLICKED
router.post('/users/profile/like/:id', db.saveToProfile);

// THIS ROUTE WILL SUBMIT A SUBTITLE TO THE SUBTITLES TABLE
router.post('/new/subtitle', db.submitSubTitle);

/*
* PUT ROUTES
*/

// UPDATE A USERS PROFILE
router.put('/users/profile/update/:id', db.updateProfile);

module.exports = router;