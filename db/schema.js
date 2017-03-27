var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Use native promises
mongoose.promise = global.Promise;


// Original Settings //

// var TutSchema = new Schema({
// 	name: String,
// 	link: String,
// 	created_at: Date,
// 	updated_at: Date
// });

// TutSchema.pre('save', function(next){
// 	now = new Date();
// 	this.updated_at = now;
// 	if (!this.created_at ) {
// 		this.created_at = now;
// 	}
// 	next();
// });

var ProjectIdeaSchema = new Schema({
	description: String,
	in_progress: Boolean,
	created_at: Date,
	updated_at: Date
});

ProjectIdeaSchema.pre('save', function(next){
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

var ItemSchema = new Schema({
	name: String
});

var UserSchema = new Schema({
	first_name: String,
	last_name: String,
	// email: String, // Original settings.
	// username: String,
	// password: String,
	email: { type: String, required: true, unique: true },
	// username: { type: String, required: true, unique: true },
	// password: { type: String, required: true, unique: true },
	created_at: Date,
	updated_at: Date,
	items: [ItemSchema],
	projectIdeas: [ProjectIdeaSchema] // Make this tuts.
	// tuts: [String]
});

UserSchema.pre('save', function(next){
	now = new Date();
	this.updated_at = now;
	if (!this.created_at ) {
		this.created_at = now;
	}
	next();
});

// UserSchema.virtual('fullname').get(function (){
// 	return this.first_name + ' ' + this.last_name;
// });

var UserModel = mongoose.model('User', UserSchema);
var ItemModel = mongoose.model('Item', ItemSchema);
var ProjectIdeaModel = mongoose.model('ProjectIdea', ProjectIdeaSchema)
// var TutModel = mongoose.model('Tut', TutSchema); // Original settings


module.exports = {
	// Tut: TutModel,
	Item: ItemModel,
	User: UserModel,
	ProjectIdea: ProjectIdeaModel
};
