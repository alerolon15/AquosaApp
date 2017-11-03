var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/registrarse', {title : "Aquosa"});
});

router.post('/',function(req,res){

  req.check('email', 'No es un email valido!').isEmail();
  var listaErrores = req.validationErrors();
  console.log(listaErrores);

	var email = req.body.email;
	var password = req.body.password;
  var nombre = req.body.nombre;
	var apellido = req.body.apellido;

  var data = {
    nombre,
    apellido,
    email,
    password
  };
	User.findOne({email: email}, function(err,users){
		if(err){
			console.log(err);
			return res.status(500).send();
		};
		if(users) {
			var options = {
				title: 'Aquosa',
        error: "<div class='alert alert-danger' role='alert'>El mail con el que desea registrarse ya existe.</div>",
        datos: req.body
			};
			return res.render('login/registrarse',options);
		};
		if(!users) {
      var usuario = new User(data);
      usuario.save(function(err){
    		console.log(usuario);
        var options = {
          title: 'Aquosa',
          error: "<div class='alert alert-danger' role='alert'>El Usuario ha sido creado con exito.</div>"
        };
        return res.render('login/registrarse',options);
    	});
    };
  });
});

module.exports = router;
