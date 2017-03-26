var express = require('express');
var router = express.Router();
var User = require('../models/user.js');


// Users Home Page Route
router.get('/', function(req, res) {
	User.find({})
		.exec(function(err, users){
			if (err) { console.log(err); }
			console.log(users);
			// res.send("This is the home page route");
			res.render('users/index.hbs', {
				users: users
		});
	});
});

// User New Route
router.get('/new', function(req, res){
	User.findById(req.params.id)
		.exec(function(err, user){
			if (err) console.log(err);
			// res.send("New User Page");
			res.render('new')
			// , {
		// 		user: user
		// });
	});
});


// User ID Route
//I am getting confuse here.

// router.post('/:id', function(req, res) {
// 	var user = new User({
// 		first_name: req.body.first_name,
// 		last_name: req.body.last_name,
// 		email: req.body.email,
// 		username: req.body.username,
// 		password: req.body.password,
// 		created_at: req.body.created_at,
// 		updated_at: req.body.updated_at,
// 		tuts: req.body.tuts
// 	});
// 	user.save(function(err, user){
// 		if (err) { console.log(err); }
// 		console.log(user);
// 		// res.send("This is the users ID Page");
// 		res.redirect('users');
// 	});
// });

// User Edit Route
router.get('/:id/edit', function(req, res){
	User.findById(req.params.id)
		.exec(function(err, user){
			if (err) console.log(err);
			// res.send("This is the user edit page.");

//I want to redirect this page to show the updated user info.
			res.render('edit', {
				user: user
		});
	});
});

//GET User by Id. //DONE
router.get('/:id', function(req, res){
	User.findById(req.params.id)
		.exec(function(err, user){
			if (err) console.log(err);
			res.render('show', {
				user: user
		});
	});
});




module.exports = router;
