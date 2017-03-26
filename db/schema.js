var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Use native promises
mongoose.promise = global.Promise;

var TutSchema = new Schema({
	name: String,
	link: String,
	created_at: Date,
	updated_at: Date
});

TutSchema.pre('save', function(next){
	now = new Date();
	this.updated_at = now;
	if (!this.created_at ) {
		this.created_at = now;
	}
	next();
});

// TutSchema.virtual('link').get(function (){
// 	return this.name + ' ' + this.link;
// });

var UserSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	username: String,
	password: String,
	created_at: Date,
	updated_at: Date,
	tuts: [String]
});

UserSchema.pre('save', function(next){
	now = new Date();
	this.updated_at = now;
	if (!this.created_at ) {
		this.created_at = now;
	}
	next();
});

UserSchema.virtual('fullname').get(function (){
	return this.first_name + ' ' + this.last_name;
});

var TutModel = mongoose.model('Tut', TutSchema);
var UserModel = mongoose.model('User', UserSchema);

module.exports = {
	Tut: TutModel,
	User: UserModel
};
