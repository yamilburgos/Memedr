// ALLOWS .ENV FILE SUPPORT
require('dotenv').config();

// FIXS CORS ISSUES
var cors = require('cors');

// USING EXPRESS
var express = require('express');

// SET UP PATHS (STATIC FILES)
var path = require('path');
// TERMINAL LOGGER
var logger = require('morgan');
var cookieParser = require('cookie-parser');

// PROCESS INCOMING FORM INPUT
var bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

// ROUTES
var index = require('./routes/index');
var authRoutes = require('./routes/authRoutes');

// USE EXPRESS METHODS
var app = express();

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// PASSPORT
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// GLOBAL VARIABLE FOR THE USER OBJECT
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

app.use(cors());
app.options('*', cors());
app.use('/', index);
app.use('/auth', authRoutes);

// CATCH 404 AND FORWARD TO ERROR HANDLER
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ERROR HANDLER
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // RENDER ERROR PAGE
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;