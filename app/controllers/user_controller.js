const mongoose = require('mongoose');
const User = mongoose.model('User');
var crypt = require('dead-simple-crypt', process.env.CRYPT_KEY);

exports.login = function(req, res){
  res.end(crypt.encrypt(req.body.email));
  //res.render('user/dashboard');
}

exports.dashboard = function(req, res){
	res.render('user/dashboard');
}