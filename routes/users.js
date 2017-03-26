var express = require('express');
var router = express.Router();

var User = require('../models/user.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find({})
		.exec(function(err, users){
			if (err) { console.log(err); }
			console.log(users);
			res.render('index.hbs', {
				users: users
			});
		});
});

router.post('/', function(req, res) {
	var newUser = new User({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		created_at: req.body.created_at,
		updated_at: req.body.updated_at,
		tuts: req.body.tuts
	});
	newUser.save();
	res.redirect('/users');
});

router.get('/:id', function(req, res){
	User.findById(req.params.id)
		.exec(function(err, user){
			if (err) console.log(err);
			res.render('show.hbs', {
				user: user
		});
	});
});

module.exports = router;
