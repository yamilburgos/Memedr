var db = require('../db/config');
var axios = require('axios');

// THIS FUNCTION WILL RETURN ALL THE MEMES FROM THE API_CACHE TABLE
function getMemes(req, res, next){
    db.any('SELECT * FROM api_cache')
    .then((data) => {
        res.status(200).json({ memes: data });
    })
    .catch((err) => {
        return next(err);
    });
}

// REQUEST THE API AND FILLS THE DATABASE WITH 100 MEMES
// MEME LINKS AND MEME NAMES
function requestAPI(req, res, next){
    const url = "https://api.imgflip.com/get_memes";

    axios.get(url)
         .then((data) => {
             // TO GET MEME LINK: data.data.data.memes["0"].url
             // TO GET MEME CAPTION: data.data.data.memes["0"].name
             //console.log(data.data.data.memes);

            return db.task(t=>t.batch(data.data.data.memes.map(r=>t.none('INSERT INTO api_cache(meme_link, meme_name)' + 'values($1, $2)', [r.url, r.name]))))
                     .then((data) => { console.log("The memes have hit the database!") })
                     .catch((err) => { return next(err); });
         }).catch((err) => { return next(err); });
}

// THIS FUNCTION WILL DELETE A SPECIFIC MEME FROM THE API_CACHE TABLE
function deleteMemeFromCache(req, res, next){
    let memeID = parseInt(req.params.id);

    db.result('DELETE FROM api_cache WHERE id = $1', memeID)
      .then((result) => { res.status(200).json({ status: `Meme ${memeID} deleted` }); })
      .catch((err) => { return next(err); });
}

// THIS FUNCTION WILL SAVE A MEME TO A USERS PROFILE
// CAPTURE THE LOGGED IN USERS ID, CAPTURE MEME ID
// INSERT INTO SAVE_MEMES TABLE
function saveToProfile(req, res, next){
    let memeID = parseInt(req.body.memeid);
    console.log(memeID);
    let userID = parseInt(req.params.id);
    console.log(userID);
    
    db.none('INSERT into save_memes(userid, memeid)' + 'VALUES($1, $2)', [userID, memeID])
      .then((data) => { res.status(200).json({ status: `Meme ${memeID} successfully saved to user ${userID}'s profile` }); /*console.log(`Meme ${memeID} saved for user ${userID}`)*/ })
      .catch((err) => { return next(err); });
}

// THIS FUNCTION WILL RETURN THE USERS THAT SAVED ANY MEME
function getUsersWithSaves(req, res, next){
    db.any('SELECT * FROM save_memes')
      .then((data) => { res.status(200).json({ Showing: "Users with Saves" , data }); })
      .catch((err) => { return next(err); });
}

// THIS FUNCTION WILL "NULLY" A USER
// WHEN A USER DECIDES TO DELETE THEIR PROFILE, WE UPDATE THEIR PROFILE WITH "NULLY" VALUES
// AND SWITCH STATUS TO INACTIVE
function nullyAUser(req, res, next){
    let userID = parseInt(req.params.id);

    db.none('UPDATE users SET username=$1, email=$2, location=$3, gender=$4, profile_image=$5, age=$6, active=$7 WHERE id=$8', 
                                ["nully", "nully@nully.com", "nully", "nully", "nully", 18, false, userID])
      .then((data) => { res.status(200).json({ status: `User ${userID} successfully nully'd` }); })
      .catch((err) => { return next(err); });
}

// THIS FUNCTION WILL ALLOW AN USER TO UPDATE THIER PROFILE
function updateProfile(req, res, next){
    let userID = parseInt(req.params.id);

    // GRAB UPDATED PROFILE INFORMATION
    let username = req.body.updatedUsername;
    let email = req.body.updatedEmail;
    let location = req.body.updatedLocation;
    let gender = req.body.updatedGender;
    let profile_image = req.body.updatedImage;

    db.none('UPDATE users SET username=$1, email=$2, location=$3, gender=$4, profile_image=$5, age=$6 WHERE id=$7', 
            [username, email, location, gender, profile_image, age, userID])
      .then((data) => { res.status(200).json({ status: `User ${userID} successfully updated` }); })
      .catch((err) => { return next(err); });
}

module.exports = { getMemes, requestAPI, deleteMemeFromCache, saveToProfile, getUsersWithSaves, nullyAUser, updateProfile,  };