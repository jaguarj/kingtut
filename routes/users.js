// var express = require('express');
// var router = express.Router();
// var User = require('../models/user.js');

// //DO NOT USE THIS ROUTES PAGE //
// //-------------------------------//

// // Users Home Page Route
// router.get('/', function(req, res) {
// 	User.find({})
// 		.exec(function(err, users){
// 			if (err) { console.log(err); }
// 			console.log(users);
// 			// res.send("This is the home page route");
// 			res.render('users/index', {
// 				users: users
// 		});
// 	});
// });

// // User New Route
// router.get('/new', function(req, res){
// 	User.findById(req.params.id)
// 		.exec(function(err, user){
// 			if (err) console.log(err);
// 			res.render('new', {
// 				user: user
// 		});
// 	});
// });

// // Create New User.
// router.post('/', function(req, res) {
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
// 		res.redirect('users/index');
// 	});
// });

// // User Edit Route // This needs more work.
// router.get('/:id/edit', function(req, res){
// 	User.findById(req.params.id)
// 		.exec(function(err, user){
// 			if (err) console.log(err);
// 			res.render('edit', {
// 				user: user
// 		});
// 	});
// });
// // This is not working!! Get help.
// // User Update Route
// router.patch('/:id', function(req, res){
// 	User.findByIdAndUpdate(req.params.id, {
// 		first_name: req.body.first_name,
// 		last_name: req.body.last_name,
// 		username: req.body.username,
// 		email: req.body.email
// 	}, { new: true })
// 		.exec(function(err, user){
// 			if (err) { console.log(err); }
// 			console.log(user);
// 			res.render('users/show.hbs', {
// 				user: user
// 		});
// 	});
// });
// // This is not working!! Get help.
// // User Delete Route
// router.delete('/:id', function(req, res){
// 	User.findByIdAndRemove(req.params.id)
// 		.exec(function(err, user){
// 			if (err) console.log(err);
// 			console.log('User deleted!');
// 			res.redirect('/users')
// 	});
// });

// //GET User by Id. //DONE
// router.get('/:id', function(req, res){
// 	User.findById(req.params.id)
// 		.exec(function(err, user){
// 			if (err) console.log(err);
// 			res.render('show', {
// 				user: user
// 		});
// 	});
// });




// module.exports = router;
