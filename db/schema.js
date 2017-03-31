var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Use native promises
mongoose.promise = global.Promise;

// Make your models with more logic in your MODELS page.
// Less logic for your routes. Skinny routes.
//

var TutSchema = new Schema({
	name: String,
	link: String,
	// in_progress: Boolean,
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

var UserSchema = new Schema({
	first_name: String,
	last_name: String,
	email: { type: String, required: true, unique: true },
	username: String,
	created_at: Date,
	updated_at: Date,
	tuts: [TutSchema]
});

UserSchema.pre('save', function(next){
	now = new Date();
	this.updated_at = now;
	if (!this.created_at ) {
		this.created_at = now;
	}
	next();
});

var UserModel = mongoose.model('User', UserSchema);
var TutModel = mongoose.model('Tut', TutSchema);


module.exports = {
	Tut: TutModel,
	User: UserModel
};
