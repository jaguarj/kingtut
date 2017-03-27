var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kingtut');

var User = require('./models/user');
var Item = require('./models/item');
var ProjectIdea = require('./models/project_idea');
// var Tut = require('./models/tut'); // Original settings.

// Use native promises
mongoose.promise = global.Promise;

// First clear the database of existing users and tuts.
User.remove({}, function(err) {// Does order matter, should tut come first?
	console.log(err);
});

Item.remove({}, function(err) {
	console.log(err);
});

ProjectIdea.remove({}, function(err) {
	console.log(err);
});

var josh = new User({
	first_name: String,
	last_name: String,
	email: String,
	username: String,
	password: String,
	created_at: Date,
	updated_at: Date,
	tuts: [url String]
});

var marc = new User({
	first_name: String,
	last_name: String,
	email: String,
	username: String,
	password: String,
	created_at: Date,
	updated_at: Date,
	tuts: [url String]
});

// var newTut = new Tut({
// 	name: String,
// 	link: String,
// 	created_at: Date,
// 	updated_at: Date
// });

// Original settings
// var newTut1 = new Tut({name: "CSS Lesson", link: "https://www.youtube.com/watch?v=lQxt6TdzsAo"});
// var newTut2 = new Tut({name: "HTML Lesson", link: "https://www.youtube.com/watch?v=lQxt6TdzsAo"});
// var newTut3 = new Tut({name: "JavaScript Lesson", link: "https://www.youtube.com/watch?v=lQxt6TdzsAo"});

var projectIdea1 = new ProjectIdea({description: 'Here is my latest tut', in_progress: true});
var projectIdea2 = new ProjectIdea({description: 'Here is my oldest tut', in_progress: true});
var projectIdea3 = new ProjectIdea({description: 'what tut?', in_progress: true});


var newItem1 = new Item({name: "CSS Lesson", link: "https://www.youtube.com/watch?v=lQxt6TdzsAo"});
var newItem2 = new Item({name: "HTML Lesson", link: "https://www.youtube.com/watch?v=lQxt6TdzsAo"});
var newItem3 = new Item({name: "JavaScript Lesson", link: "https://www.youtube.com/watch?v=lQxt6TdzsAo"});


var users = [josh, marc];
var projectIdeas = [projectIdea1, projectIdea2, projectIdea3];
var items = [newItem1, newItem2, newItem3];


// var tuts = [newTut1, newTut2, newTut3]; // Original settings

// tuts.forEach(function(tut, i){
// 	tut.save(function(err){
// 		if(err) { console.log(err); }

// 		console.log(newTut1);
// 	});
// });

// tut.save(function(err){
// 	if (err) console.log(err);
// 	console.log('tut created!');
// });


projectIdeas.forEach(function(projectIdea, i){
	projectIdea.save(function(err){
		if(err) { console.log(err); }

		console.log(projectIdea);
	});
});

items.forEach(function(item, i){
	item.save(function(err){
		if(err) { console.log(err); }

		console.log(item1);
	});
});



// tut.save(function(err){
// 	if (err) console.log(err);
// 	console.log('tut created!');
// });

users.forEach(function(user, i){
	user.projectIdeas.push(projectIdeas[i]);

	user.items.push(items[i]);

	user.save(function(err){
		if(err) { console.log(err); }

		console.log(user);
	});
});


user.save(function(err){
	if (err) console.log(err);
	console.log('user saved');
});


