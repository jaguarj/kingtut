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
			console.log("############# Home Page #############");
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
			console.log("############# Add New User #############");
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
	});
	user.save(function(err, user){
		if (err) { console.log(err); }
		console.log(user);
		console.log("############# Add New Users Updated #############");
		res.redirect('/users');
	});
});

// User Edit Route
router.get('/:id/edit', function(req, res){
	User.findById(req.params.id)
		.exec(function(err, user){
			if (err) console.log(err);
			console.log("############# Users Edit #############");
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
		last_name: req.body.last_name,
		email: req.body.email,

		},
	}, { new: true })
		.exec(function(err, user){
			if (err) { console.log(err); }
			console.log(user);
			console.log("############# Users Update #############");
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
		console.log("############# Users Show Page #############");
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
			console.log("############# User Deleted #############");
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
			console.log("############# Users TUT Index #############");
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
			console.log('fewaefijefwajiop')
			const newTut = {
				name: req.body.name,
				link: req.body.link,
				in_progress: req.body.in_progress
			}

			user.tuts.push(newTut)
			console.log("############# New TUT Created and Stored #############");
			user.save(function (err) {
				if (err) console.log(err);
				console.log('New tut created')
			});

			res.redirect('/users');
	});
});


// Show the new tut
router.get('/:id/tuts/new', function(req, res){
	User.findById(req.params.id)
		.exec(function (err, user) {
			if (err) { console.log(err) }
				console.log("############# Show New Users TUT Created #############");
				res.render('tuts/show', {
					user: user
		});
	});
});



module.exports = router;
