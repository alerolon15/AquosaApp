var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.reset();
  res.render('login/login', { title: 'Aquosa' });
});

router.post('/login',function(req,res){

	var email = req.body.email;
	var password = req.body.password;

	User.findOne({email: email, password: password}, function(err,users){
		if(err){
			console.log(err);
			return res.status(500).send();
			req.session.reset();
		}
		if(!users) {
			req.session.reset();
			var options = {
				title: 'Aquosa',
        error: "<div class='alert alert-danger' role='alert'>El usuario o la contraseña no son correctas</div>"
			}
			return res.render('login/login',options)
		}
		if(users) {
			req.session.user = users;
			return res.redirect('/index')}
    });
});

module.exports = router;
