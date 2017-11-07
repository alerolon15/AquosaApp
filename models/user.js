var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  nombre: {type: String, required: true, unique: true},
  apellido: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true}
  //esAdmin: {type: boolean}
});

module.exports = mongoose.model('User', userSchema);
