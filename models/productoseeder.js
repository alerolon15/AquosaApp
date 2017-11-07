var mongoose = require('mongoose');
var Producto = require('../models/producto');
mongoose.connect('localhost:27017/Aquosa');

var codigo = "mtr03"
var titulo = "Mistral remera";
var descripcion = "remera azul";
var precio = 350;
var categoria = "Remeras";
var imagenes = [];
    imagenes.push("public/images/productos/producto3-1.jpg", "public/images/productos/producto3-2.jpg", "public/images/productos/producto3-3.jpg");


var data = {
  codigo,
  titulo,
  descripcion,
  precio,
  categoria,
  imagenes
};

var producto = new Producto(data);
producto.save(function(err){
  if (err) {console.log(err)}
  else { console.log(producto) };
  mongoose.disconnect();
});
