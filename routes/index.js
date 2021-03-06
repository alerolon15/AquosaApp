var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Producto = require('../models/producto');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session && req.session.user){
    var inicialN = req.session.user.nombre.substring(0,1);
    var inicialA = req.session.user.apellido.substring(0,1);
    var iniciales = inicialN.toUpperCase() + inicialA.toUpperCase();
    req.session.user.iniciales = iniciales;

    Producto.find({}, function(err, productos){
      var categorias = [];
      productos.forEach(function(prod){
          categorias.push(prod.categoria);
      });

      var categoriasV = [];
      categorias.forEach(function(cate) {
        if(categoriasV.indexOf(cate) === -1) {
          categoriasV.push(cate);
        }
      });
      res.render('index/index', { usuario: req.session.user, productos: productos, categorias: categoriasV});
    });
  }else{
    res.redirect("/")
  }
});

router.get('/:categoria', function(req, res, next) {
  if(req.session && req.session.user){
    var inicialN = req.session.user.nombre.substring(0,1);
    var inicialA = req.session.user.apellido.substring(0,1);
    var iniciales = inicialN.toUpperCase() + inicialA.toUpperCase();
    req.session.user.iniciales = iniciales;

    var categoriasV = [];

    Producto.find({}, function(err, productosCate){
      var categorias = [];
      productosCate.forEach(function(prod){
          categorias.push(prod.categoria);
      });

      categorias.forEach(function(cate) {
        if(categoriasV.indexOf(cate) === -1) {
          categoriasV.push(cate);
        }
      });
    });
    var categoria = req.params.categoria;

    Producto.find({categoria: categoria}, function(err, productos){
      res.render('index/index', { usuario: req.session.user, productos: productos, categorias: categoriasV});
    });
  }else{
    res.redirect("/")
  }
});

module.exports = router;
