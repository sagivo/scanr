var crypt = require('dead-simple-crypt', 'yokouno2');

exports.login = function(req, res){
  res.end(crypt.decrypt(req.body.email));
  //res.render('user/dashboard');
}

exports.dashboard = function(req, res){
	res.render('user/dashboard');
}