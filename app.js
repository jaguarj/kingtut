pry = require('pryjs')''

var mongoose = require('mongoose');
var express = require('express');
var hbs = require('hbs');//View engine
var path = require('path');//View engine
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var db = require('./db');
mongoose.connect('mongoose://localhost/kingtut');



var index = require('./routes/index');
var users = require('./routes/users');
var tuts = require('./routes/tuts');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


app.use(session({
	secret: "derpderpderpcats",
	resave: false,
	saveUninitialized: false
}));

app.use('/', index);//Index page
app.use('/users', users);//Users page
app.use('/tuts', tuts);//Tuts page

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
