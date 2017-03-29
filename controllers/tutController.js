var express = require('express');
var router = express.Router({mergeParams: true});

var User = require('../models/user');
var Tut = require('../models/tut');

// Tut edit route
router.get('/:id/edit', function editTut(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }
			console.log("############# Edit TUT Page #############");
			const tut = user.tuts.id(req.params.id);
			res.render('tuts/edit', {
				tut: tut,
				user: user
		});
	});
});

// Update Tut
// /users/:user_id/tuts/:id
router.put('/:id', function updateTut(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }
			const tut = user.tuts.id(req.params.id);
					tut.name = req.body.name
					tut.link = req.body.link
			user.save();
			console.log("############# Edit Tut Update #############");

			res.redirect(`/users/${req.params.userId}/tuts/${req.params.id}`)
	});
});

// :id/tuts/:id
// New tut
router.get('/new', function newTut(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }
			console.log("############# New TUT Page #############");
			res.render('tuts/new', {
				user: user
		});
	});
});

// Delete Tuts this is working.
router.delete('/:id', function deleteTut(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }
			console.log('Deleted from the tutscontroller');
			user.tuts.id(req.params.id).remove();
			user.save(function (err){
				if (err) console.log(err);
				console.log("############### Delete Tuts ##################");
				console.log('Tut idea was deleted')
			});
			res.redirect(`/users/${req.params.userId}/tuts`)
	});
});

// Show
router.get('/:id', function showTut(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }

			const tut = user.tuts.id(req.params.id);
			console.log("############### Show Tuts ##################");
			res.render('tuts/show', {
				tut: tut,
				user: user
			});
	});
});

module.exports = router;

