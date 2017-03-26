var express = require('express');
var router = express.Router();

var User = require('../models/tut.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a tut resource');
});

router.post('/', function(req, res) {
	var newTut = new Tut({
	// id: String,
	name: req.body.name,
	link: req.body.link,
	created_at: Date,
	updated_at: Date
});
	newTut.save();
	res.send(newTut);
});

module.exports = router;
