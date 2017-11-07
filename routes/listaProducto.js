var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Producto = require('../models/producto');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session && req.session.user && req.session.user.esAdmin){
    var inicialN = req.session.user.nombre.substring(0,1);
    var inicialA = req.session.user.apellido.substring(0,1);
    var iniciales = inicialN.toUpperCase() + inicialA.toUpperCase();
    req.session.user.iniciales = iniciales;

    Producto.find({}, function(err, productos){
      res.render('productos/lista', { usuario: req.session.user, productos: productos});
    });
  }else{
    res.redirect("/index")
  }
});

module.exports = router;