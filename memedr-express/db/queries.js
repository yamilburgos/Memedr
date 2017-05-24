var db = require('../db/config');
var axios = require('axios');

// THIS FUNCTION WILL RETURN ALL THE MEMES FROM THE API_CACHE TABLE
function getMemes(req, res, next){
    db.any('SELECT * FROM api_cache')
    .then((data) => {
        res.status(200).json({ memes:data });
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
      .then((result) => { res.status(200).json({ status: "Meme Deleted" }); })
      .catch((err) => { return next(err); });
}

// 

module.exports = { getMemes, requestAPI, deleteMemeFromCache,  };