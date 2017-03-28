var express = require('express');
var router = express.Router({mergeParams: true});

var User = require('../models/user');
var Tut = require('../models/tut');

// Make the variables camelCase

// Tut idea route
router.get('/', function indexTut(req, res){
	User.findById(req.params.userId)
		.exec(function(err, user){
			if(err) { console.log(err); }
			res.render('tut/index.hbs', {
				user: user
		});
	});
});

// Tut edit route
router.get('/:id/edit', function editTut(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }
			const tut = user.tuts.id(req.params.id);

			res.render('tut/edit', {
				tut: tut,
				user: user
		});
	});
});

// User.findByIdAndUpdate(req.params.id, {
// 		$set: {
// 		first_name: req.body.first_name,
// 		last_name: req.body.last_name, // Original settings
// 		email: req.body.email,
// 		// tuts: req.body.tuts
// 		},


// Update Tut idea
router.put('/:id', function updateTut(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }
			const tut = user.tuts.id(req.params.id);

			tut.description = req.body.description
			tut.in_progress = req.body.in_progress
			user.save();

			res.render('tut/show', {
				tut: tut,
				user: user
		});
	});
});

// New tut
router.get('/new', function newTut(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }
			res.render('tut/new', {
				user: user
		});
	});
});

// Create a new tut
router.post('/', function createTut(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }
//Add new tut based off this model.
			const newTut = {
				description: req.body.description,
				in_progress: req.body.in_progress
			}

			user.tuts.push(newTut)

			user.save(function (err) {
				if (err) console.log(err);
				console.log('New tut created')
			});

			res.redirect('/users')
	});

});

// Delete
router.delete('/:id', function deleteTut(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }

			user.tuts.id(req.params.id).remove();

			user.save(function (err){
				if (err) console.log(err);
				console.log('Tut idea was deleted')
			});

			res.render('tut/index', {
				user: user
		});
	});
});

// Show
router.get('/:id', function showTut(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }

			const tut = user.tuts.id(req.params.id);
			res.render('tut/show', {
				tut: tut,
				user: user
		});
	});
});

module.exports = router;

