var db = require('../db/config');
var axios = require('axios');

/*
* GET ROUTES
*/

// REQUEST THE API AND FILLS THE DATABASE WITH 100 MEMES
// MEME LINKS AND MEME NAMES
function requestAPI(req, res, next){
    const url = "https://api.imgflip.com/get_memes";

    axios.get(url)
         .then((data) => {
             // TO GET MEME LINK: data.data.data.memes["0"].url
             // TO GET MEME NAME: data.data.data.memes["0"].name
             //console.log(data.data.data.memes);

            return db.task(t=>t.batch(data.data.data.memes.map(r=>t.none('INSERT INTO api_cache(meme_link, meme_name)' + 'values($1, $2)', [r.url, r.name]))))
                     .then((data) => { console.log("The memes have hit the database!") })
                     .catch((err) => { return next(err); });
         }).catch((err) => { return next(err); });
}

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

// THIS FUNCTION WILL RETURN THE USERS THAT LIKED ANY MEME
function getUsersWithLikes(req, res, next){
    db.any('SELECT * FROM liked_memes')
      .then((data) => { res.status(200).json({ Showing: "Users with Likes" , data }); })
      .catch((err) => { return next(err); });
}

function getSubTitles(req, res, next){
    db.any('SELECT * FROM subtitles')
      .then((data) => { res.status(200).json({ Showing: "Subtitles" , data }); })
      .catch((err) => { return next(err); });
}

// THIS FUNCTION WILL RETURN USERS THAT LIKE THE SAME MEME
// EXCLUDING THE USER THAT DOES THE QUERY
function getMyMatches(req, res, next){
    let userID = parseInt(req.params.id);

    db.any(`SELECT users.username, users.id, users.email, liked_memes.memeid
            FROM users
            INNER JOIN liked_memes ON users.id = liked_memes.userid
            WHERE users.id = ${userID}`)
            .then((data) => {
                let memeID = data[0].memeid;
                //console.log(data);

                db.any(`SELECT users.username, users.id, users.gender, users.location, users.profile_image, users.email, users.age, liked_memes.memeid
                        FROM users
                        INNER JOIN liked_memes ON users.id = liked_memes.userid
                        WHERE liked_memes.memeid = ${memeID} AND users.id != ${userID}`)
                  .then((data) => { 
                    res.status(200).json({ status: `Users that have the same likes as User ${userID}`, data }); 
                    
                    db.task(t=>t.batch(data.map(r=>t.none('INSERT INTO users_matches(userid, username, meme_in_common, gender, location, profile_image, email, age, who_clicked_matches)' + 'values($1, $2, $3, $4, $5, $6, $7, $8, $9)', [r.id, r.username, memeID, r.gender, r.location, r.profile_image, r.email, r.age, userID]))))
                            .then((data) => { console.log("Matches have hit the database"); })
                            .catch((err) => { return next(err); });
                  })
                  .catch((err) => { return next(err); });
            })
            .catch((err) => { return next(err); });
}


/*
* POST ROUTES
*/

// THIS FUNCTION WILL LIKE A MEME TO A USERS PROFILE
// CAPTURE THE LOGGED IN USERS ID, CAPTURE MEME ID
// INSERT INTO LIKED_MEMES TABLE
function likeMeme(req, res, next){
    let userID = parseInt(req.params.id);
    console.log(`add a like`);
    console.log(userID);
    let memeID = parseInt(req.body.memeid);
    console.log(memeID);
    
    db.none('INSERT into liked_memes(userid, memeid)' + 'VALUES($1, $2)', [userID, memeID])
      .then((data) => { res.status(200).json({ status: `Meme ${memeID} successfully saved to user ${userID}'s profile` }); })
      .catch((err) => { console.log(err); });
}

// THIS FUNCTION WILL SUBMIT A SUBTITLE TO THE SUBTITLES TABLE
function submitSubTitle(req, res, next){
    let subtitle = req.body.subtitle;

    db.none('INSERT into subtitles(subtitle)' + 'VALUES($1)', subtitle)
      .then((data) => { res.status(200).json({ status: `Subtitle Inserted` }); })
      .catch((err) => { return next(err); });
}


/*
* PUT ROUTES
*/

// THIS FUNCTION WILL ALLOW AN USER TO UPDATE THIER PROFILE
function updateProfile(req, res, next){
    let userID = parseInt(req.params.id);

    // GRAB UPDATED PROFILE INFORMATION
    let username = req.body.updatedUsername;
    let email = req.body.updatedEmail;
    let location = req.body.updatedLocation;
    let gender = req.body.updatedGender;
    let profile_image = req.body.updatedImage;
    let age = req.body.updatedAge;

    db.none('UPDATE users SET username=$1, email=$2, location=$3, gender=$4, profile_image=$5, age=$6 WHERE id=$7', 
            [username, email, location, gender, profile_image, age, userID])
      .then((data) => { res.status(200).json({ status: `User ${userID}'s profile successfully updated` }); })
      .catch((err) => { return next(err); });
}

// THIS FUNCTION WILL DELETED A LIKED MEME FROM A USERS PROFILE
// CAPTURE THE LOGGED IN USERS ID, CAPTURE MEME ID
// REMOVE FROM LIKED_MEMES TABLE
function unLikeMeme(req, res, next){
    let userID = parseInt(req.params.id);
    console.log(`remove a like`);
    console.log(userID);
    let memeID = parseInt(req.body.memeid);
    console.log(memeID);

    db.result('DELETE FROM liked_memes WHERE userid = $1 AND memeid = $2', [userID, memeID])
      .then((result) => { res.status(200).json({ status: `Meme ${memeID} removed from User ${userID}'s profile` }); })
      .catch((err) => { console.log(err); });
}


/*
* DELETE ROUTES
*/

// THIS FUNCTION WILL DELETE A SPECIFIC MEME FROM THE API_CACHE TABLE
function deleteMemeFromCache(req, res, next){
    let memeID = parseInt(req.params.id);

    db.result('DELETE FROM api_cache WHERE id = $1', memeID)
      .then((result) => { res.status(200).json({ status: `Meme ${memeID} deleted` }); })
      .catch((err) => { return next(err); });
}

// THIS FUNCTION WILL DELETE A USER
function deleteAccount(req, res, next){
    let userID = parseInt(req.params.id);

    db.result('DELETE FROM liked_memes WHERE liked_memes.userid = $1', userID)
      .then((data) => { 
          db.result('DELETE FROM users_matches WHERE users_matches.userid = $1', userID)
            .then((data) => {
                db.result('DELETE FROM users WHERE id = $1', userID)
                  .then((data) => {
                    res.status(200).json({ status: `User ${userID} successfully deleted` });
                  }).catch((err) => { return next(err); });
            }).catch((err) => { return next(err); });
    }).catch((err) => { return next(err); });
}

// THIS FUNCTION WILL DELETE A MATCH
function deleteMyMatch(req, res, next){
    let userID = parseInt(req.params.id);
    let userName = req.body.username;

    db.result('DELETE FROM users_matches WHERE who_clicked_matches = $1 AND username = $2', [userID, userName])
      .then((data) => { res.status(200).json({ status: `${userName} successfully deleted from ${userID}'s matches.` }); })
      .catch((err) => { return next(err); });
}

module.exports = { getMemes, requestAPI, deleteMemeFromCache, likeMeme, unLikeMeme,
                   getUsersWithLikes, updateProfile, deleteMyMatch, 
                   getMyMatches, deleteAccount, submitSubTitle, getSubTitles };