var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('client-sessions');
var expressValidator = require('express-validator');
var multer = require('multer');

var login = require('./routes/login');
var index = require('./routes/index');
var registrarse = require('./routes/registrarse');
var cambiarPassword = require('./routes/cambiarPassword');
var recuperar = require('./routes/recuperar');
var crearProducto = require('./routes/crearProducto');


var app = express();

// mongoose conexion
mongoose.connect('localhost:27017/Aquosa');

//sesiones
app.use(session({
	cookieName: 'session',
	secret: 'h17hd87ahhd917793dgasdg6',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000
}));

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use('/public', express.static('public'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', login);
app.use('/index', index);
app.use('/registrarse', registrarse);
app.use('/cambiarPassword', cambiarPassword);
app.use('/recuperar', recuperar);
app.use('/crearProducto', crearProducto);


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
