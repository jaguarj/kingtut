var express = require('express');
var router = express.Router();

var User = require('../models/user.js');
var Tut = require('../models/tut.js');

// Users Index Route
router.get('/', function(req, res) {
	User.find({})
		.exec(function(err, users){
			if (err) { console.log(err); }
			console.log(users);
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
			res.render('users/new.hbs')
		// 	, {
		// 		user: user
		// });
	});
});

// Create New User.
router.post('/', function(req, res) {
	var user = new User({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		username: req.body.username
		// tuts: req.body.tuts

		// password: req.body.password,
		// created_at: req.body.created_at,
		// updated_at: req.body.updated_at,
		// tuts: req.body.tuts
	});
	user.save(function(err, user){
		if (err) { console.log(err); }
		console.log(user);
		res.redirect('/users');
	});
});

// User Edit Route
router.get('/:id/edit', function(req, res){
	User.findById(req.params.id)
		.exec(function(err, user){
			if (err) console.log(err);
			res.render('users/edit.hbs', {
				user: user
		});
	});
});


// User Update Route
router.put('/:id', function(req, res){
	User.findByIdAndUpdate(req.params.id, {
		$set: {
		first_name: req.body.first_name,
		last_name: req.body.last_name, // Original settings
		email: req.body.email,
		// username: req.body.username,
		// password: req.body.password,

		},
	}, { new: true })
		.exec(function(err, user){
			if (err) { console.log(err); }
			console.log(user);
			res.render('users/show.hbs', {
				user: user
		});
	});
});

// User Show route
router.get('/:id', function(req, res){
	User.findById(req.params.id)
	.exec(function(err, user) {
		if (err) console.log(err);
		console.log(user);
		res.render('users/show.hbs', {
			user: user
		});
	});
});


// User Delete Route
router.delete('/:id', function(req, res){
	User.findByIdAndRemove(req.params.id)
		.exec(function(err, user){
			if (err) console.log(err);
			console.log('User deleted!');
			res.redirect('/users')
	});
});

// Tuts Index
router.get('/:id/tuts', function(req, res){
	User.findById(req.params.id)
		.exec(function(err, user){
			if (err) { console.log(err); }
			console.log(user.id)
			console.log(user.tuts)
			res.render('tuts/index.hbs', {
				tuts: user.tuts,
				user: user

		});
	});
});

// Create a new tut
router.post('/:id/tuts', function(req, res){
	User.findById(req.params.id)
		.exec(function(err, user){
			user.tuts.push(new Tut({name: req.body.name}));
			user.save(function(err){
			if (err) console.log(err);
			res.redirect('/users');
		});
	});
});


// Show the new tut
router.get('/:id/tuts/new', function(req, res){
	User.findById(req.params.id)
		.exec(function (err, user) {
			if (err) { console.log(err) }
				res.render('tuts/show', {
					user: user

		});
	});
});
// Just added the Edit route 4:44pm Not working...
// router.put('/:userId/tuts/:id/new', function(req, res){
// 	User.findByIdAndUpdate(req.params.id)
// 		User.findById(req.params.id)
// 		.exec(function (err, user) {
// 			if (err) { console.log(err) }
// 				res.render('/:id/tuts/edit', {
// 					user: user
// 		});
// 	});
// });

// Remove tut
router.delete('/:userId/tuts/:id', function(req, res){
	User.findByIdAndUpdate(req.params.userId, {
		$pull: {
			tuts: {_id: req.params.id}
		}
	})
	.exec(function(err, tut){
		if (err) console.log(err);
		res.redirect('/users')
	});
});



module.exports = router;
