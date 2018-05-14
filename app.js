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
var request = require('request');



var login = require('./routes/user/login');
var index = require('./routes/index');
var registrarse = require('./routes/user/registrarse');
var cambiarPassword = require('./routes/user/cambiarPassword');
var recuperar = require('./routes/user/recuperar');
var crearProducto = require('./routes/productos/crearProducto');
var listaProducto = require('./routes/productos/listaProducto');
var infoProducto = require('./routes/productos/infoProducto');
var listaPedido = require('./routes/pedidos/listaPedido');
var misPedido = require('./routes/pedidos/misPedido');
var infoPedido = require('./routes/pedidos/infoPedido');
var crearPedido = require('./routes/pedidos/crearPedido');
var agregarCarrito = require('./routes/carrito/agregarCarrito');
var carrito = require('./routes/carrito/carrito');

var app = express();

// mongoose conexion
mongoose.connect('mongodb://localhost:27017/Aquosa',{useMongoClient: true});
mongoose.connection.on('error', function(err){
	console.log(' \x1b[41m%s\x1b[0m','Error al intentar conectar con MongoDB.', 'Mensaje: ' + err.message);
	process.exit();
});
// esta linea crea el usuario Administrador
var crear = require('./models/crearUsuarioAdmin');

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
app.use('/listaProducto', listaProducto);
app.use('/infoProducto', infoProducto);
app.use('/crearPedido', crearPedido);
app.use('/listaPedido', listaPedido);
app.use('/misPedido', misPedido);
app.use('/infoPedido', infoPedido);
app.use('/agregarCarrito', agregarCarrito);
app.use('/carrito', carrito);


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
