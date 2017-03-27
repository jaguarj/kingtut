var express = require('express');
var router = express.Router();

var User = require('../models/user.js');
var Item = require('../models/item.js');

// Users Index Route
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
		// last_name: req.body.last_name, // Original settings
		email: req.body.email,
		items: req.body.items
		// username: req.body.username,
		// password: req.body.password,
		// created_at: req.body.created_at,
		// updated_at: req.body.updated_at,
		// tuts: req.body.tuts
	});
	user.save(function(err, user){
		if (err) { console.log(err); }
		console.log(user);
		// res.send("This is the users ID Page");
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
		first_name: req.body.first_name,
		// last_name: req.body.last_name, // Original settings
		// username: req.body.username,
		email: req.body.email
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

// This is not working!! Get help.
// User Delete Route
router.delete('/:id', function(req, res){
	User.findByIdAndRemove(req.params.id)
		.exec(function(err, user){
			if (err) console.log(err);
			console.log('User deleted!');
			res.redirect('/users')
	});
});

// Item Index
router.get('/:id/items', function(req, res){
	User.findById(req.params.id)
		.exec(function(err, user){
			if (err) { console.log(err); }
			console.log(user.id)
			console.log(user.items)
			res.render('items/index.hbs', {
				items: user.items,
				user: user

		});
	});
});

// Create a new item
router.post('/:id/items', function(req, res){
	User.findById(req.params.id)
		.exec(function(err, user){
			user.items.push(new Item({name: req.body.name}));
			user.save(function(err){
			if (err) console.log(err);
			res.redirect('/users');
		});
	});
});


// Show the new item
router.get('/:id/items/new', function(req, res){
	User.findById(req.params.id)
		.exec(function (err, user) {
			if (err) { console.log(err) }
				res.render('items/new', {
					user: user
		});
	});
});

// Remove an item
router.delete('/:userId/items/:id', function(req, res){
	User.findByIdAndUpdate(req.params.userId, {
		$pull: {
			items: {_id: req.params.id}
		}
	})
	.exec(function(err, item){
		if (err) console.log(err);
		res.redirect('/users')
	});
});



module.exports = router;
