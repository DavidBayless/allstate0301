var express = require('express');
var router = express.Router();
var db = require('../config/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.get('albums').find({}, function(err, albums) {
    console.log('these are albums', albums);
    res.render('albumz/index', { albums: albums });
  });
});

router.get('/new', function(req, res) {
  res.render('albumz/new');
});

router.post('/', function(req, res) {
  console.log('Helloooooo');
  db.get('albums').insert({genre: req.body.genre, artist: req.body.artist, album: req.body.album, rating: req.body.rating, isExplicit: req.body.explicit}, function(err, data) {
    res.redirect('/albumz');
  });
});

module.exports = router;
