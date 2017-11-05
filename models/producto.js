var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productoSchema = new Schema({
  codigo: {type: String, required:true, unique: true},
  titulo: {type: String, required:true},
  descripcion: {type: String, required:true},
  precio: {type: Number, required:true},
  categoria: {type: String, required:true},
  imagenes: [String]
});

module.exports = mongoose.model('Producto', productoSchema);
