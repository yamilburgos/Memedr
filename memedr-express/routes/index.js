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
* POST ROUTES
*/

// LIKE A MEME TO A USER PROFILE
// WHEN THE LIKE IS CLICKED
router.post('/users/profile/like/:id', db.likeMeme);

// THIS ROUTE WILL SUBMIT A SUBTITLE TO THE SUBTITLES TABLE
router.post('/new/subtitle', db.submitSubTitle);

/*
* PUT ROUTES
*/

// UPDATE A USERS PROFILE
router.put('/users/profile/update/:id', db.updateProfile);

// UNLIKE A MEME FROM A USER PROFILE
// WHEN THE UNLIKE IS CLICKED
router.put('/users/profile/unlike/:id', db.unLikeMeme);

/*
* DELETE ROUTES
*/

// ADMINISTRATION
// DELETE MEME FROM API_CACHE TABLE
router.delete('/meme/:id', db.deleteMemeFromCache);

// DELETE A USER
// IF A USER DECIDES TO DELETE THEIR ACCOUNT
router.delete('/users/profile/delete/:id', db.deleteAccount);

// DELETE A MATCH
router.put('/users/profile/delete/match/:id', db.deleteMyMatch);

module.exports = router;