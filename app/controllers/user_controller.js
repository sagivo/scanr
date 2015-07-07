const User = mongoose.model('User');
var crypt = require('dead-simple-crypt', 'yokouno2');

exports.login = function(req, res){
  res.end(crypt.encrypt(req.body.email));
  //res.render('user/dashboard');
}

exports.dashboard = function(req, res){
	res.render('user/dashboard');
}