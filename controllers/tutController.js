var express = require('express');
var router = express.Router({mergeParams: true});

var User = require('../models/user');
var Tut = require('../models/tut');



// Tut idea route
router.get('/', function indexTut(req, res){
	User.findById(req.params.userId)
		.exec(function(err, user){
			if(err) { console.log(err); }
			res.render('tuts/index.hbs', {
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

			res.render('tuts/edit', {
				tut: tut,
				user: user
		});
	});
});


// Update Tut idea
// /users/:user_id/tuts/:id
router.put('/:id', function updateTut(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }
			const tut = user.tuts.id(req.params.id);

			tut.name = req.body.name
			tut.link = req.body.link
			user.save();
			console.log("#####################TUT Controller#################")
			// res.render('tuts/show', {
			// 	tut: tut,
			// 	user: user
			// });
			res.redirect(`/users/${req.params.userId}/tuts/${req.params.id}`)
	});
});

// :id/tuts/:id
// New tut
router.get('/new', function newTut(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }
			res.render('tuts/new', {
				user: user
		});
	});
});

// });
// After
// :id/tuts/:id

// Before
// /:id
// Delete
// /users/:userId/tuts   /:id
router.delete('/:id', function deleteTut(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }
			console.log('Deleted from the tutscontroller');
			user.tuts.id(req.params.id).remove();

			user.save(function (err){
				if (err) console.log(err);
				console.log('Tut idea was deleted')
			});

			// res.redirect('/users/' + req.params.userId + '/tuts')
			res.redirect(`/users/${req.params.userId}/tuts`)
	});
});

// Show

// Before
// /:id'
router.get('/:id', function showTut(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }

			const tut = user.tuts.id(req.params.id);
			console.log("##################DELETE######################");
			res.render('tuts/show', {
				tut: tut,
				user: user
			});
	});
});

module.exports = router;

