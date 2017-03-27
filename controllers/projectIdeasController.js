var express = require('express');
var router = express.Router({mergeParams: true});

var User = require('../models/user');
var Item = require('../models/item');
var ProjectIdea = require('../models/project_idea');

// Project idea route
router.get('/', function indexProjectIdea(req, res){
	User.findById(req.params.userId)
		.exec(function(err, user){
			if(err) { console.log(err); }
			res.render('project_ideas/index.hbs', {
				user: user
		});
	});
});

// Project edit route
router.get('/:id/edit', function editProjectIdea(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }
			const projectIdea = user.projectIdeas.id(req.params.id);

			res.render('project_ideas/edit', {
				projectIdea: projectIdea,
				user: user
		});
	});
});

// Update project idea
router.put('/:id', function updateProjectIdea(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }
			const projectIdea = user.projectIdeas.id(req.params.id);

			projectIdea.description = req.body.description
			projectIdea.in_progress = req.body.in_progress
			user.save();

			res.render('project_ideas/show', {
				projectIdea: projectIdea,
				user: user
		});
	});
});

// New project idea
router.get('/new', function newProjectIdea(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }
			res.render('project_ideas/new', {
				user: user
		});
	});
});

// Create a new project
router.post('/', function createProjectIdea(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }

			const newProjectIdea = {
				description: req.body.description,
				in_progress: req.body.in_progress
			}

			user.projectIdeas.push(newProjectIdea)

			user.save(function (err) {
				if (err) console.log(err);
				console.log('Project created')
			});

			res.redirect('/users')
	});

});

// Delete
router.delete('/:id', function deleteProjectIdea(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }

			user.projectIdeas.id(req.params.id).remove();

			user.save(function (err){
				if (err) console.log(err);
				console.log('Project idea was deleted')
			});

			res.render('project_ideas/index', {
				user: user
		});
	});
});

// Show
router.get('/:id', function showProjectIdea(req, res){
	User.findById(req.params.userId)
		.exec(function (err, user){
			if (err) { console.log(err); }

			const projectIdea = user.projectIdeas.id(req.params.id);
			res.render('project_ideas/show', {
				projectIdea: projectIdea,
				user: user
		});
	});
});

module.exports = router;

