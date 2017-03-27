var express = require('express');
var router = express.Router();
var Tut = require('../models/tut.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
	Tut.findById(req.params.userId)
	.exec(function(err, user){
		if (err) { console.log(err); }
		// res.send('respond with a tut resource');
		res.render('tuts/index', {
			user: user
		});
	});
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
	res.render('tuts/new');
});

module.exports = router;
