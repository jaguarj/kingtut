var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kingtut');

var User = require('./models/user');
var Tut = require('./models/tut');

// Use native promises
mongoose.promise = global.Promise;

// First clear the database of existing users and tuts.
User.remove({}, function(err) {// Does order matter, should tut come first?
	console.log(err);
});

Tut.remove({}, function(err) {
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

var newTut = new Tut({
	name: String,
	link: String,
	created_at: Date,
	updated_at: Date
});

var newTut1 = new Tut({name: "CSS Lesson", link: "https://www.youtube.com/watch?v=lQxt6TdzsAo"});
var newTut2 = new Tut({name: "HTML Lesson", link: "https://www.youtube.com/watch?v=lQxt6TdzsAo"});
var newTut3 = new Tut({name: "JavaScript Lesson", link: "https://www.youtube.com/watch?v=lQxt6TdzsAo"});

var users = [josh, marc];
var tuts = [newTut1, newTut2, newTut3];

tuts.forEach(function(tut, i){
	tut.save(function(err){
		if(err) { console.log(err); }

		console.log(newTut1);
	});
});

tut.save(function(err){
	if (err) console.log(err);
	console.log('tut created!');
});

users.forEach(function(user, i){
	user.save(function(err){
		if(err) { console.log(err); }

		console.log(user);
	});
});


user.save(function(err){
	if (err) console.log(err);
	console.log('user created!');
});


