var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kingtut');

var User = require('../models/user');
var Tut = require('../models/tut');

// Use native promises
mongoose.promise = global.Promise;

// First clear the database of existing users and tuts.
User.remove({}, function(err) {// Does order matter, should tut come first?
	console.log(err);
});

var newTut1 = new Tut({name: "CSS Lesson", link: "https://www.youtube.com/watch?v=lQxt6TdzsAo"});
var newTut2 = new Tut({name: "HTML Lesson", link: "https://www.youtube.com/watch?v=lQxt6TdzsAo"});
var newTut3 = new Tut({name: "JavaScript Lesson", link: "https://www.youtube.com/watch?v=lQxt6TdzsAo"});

//Create new users.

var josh = new User({
	first_name: "Josh",
	last_name: "Seipel",
	email: "josh@gmail.com",
	username: "jaguarj",
	password: "password",
	tuts: [newTut1, newTut2, newTut3]
});

josh.save(function(err){
	if (err) console.log(err);
	console.log('josh created!');
});




