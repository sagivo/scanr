"use strict";

const mongoose = require('mongoose');
const User = mongoose.model('User');
var crypt = require('dead-simple-crypt', process.env.CRYPT_KEY);

exports.login = function(req, res){
  console.log(req.body);
  User.findOne({email: req.body.email, password: crypt.encrypt(req.body.password)}, function(err, user){
    if (user){
      res.cookie('t', token, {expires: new Date(Date.now() + 30 * 24 * 3600000) }); //30 days
      res.json({status: 'ok'});
    } else res.render('user/dashboard', {alert: {type: 'danger', msg: 'user not found'} });
  });
}

exports.register = function(req, res){
  let token = crypt.gui();
  User.create({email: req.body.email, password: crypt.encrypt(req.body.password), token: token}, function(err, user){
    if (err) res.json({error: 'bad user data'})
    if (user){
      res.cookie('t', token, {expires: new Date(Date.now() + 30 * 24 * 3600000) }); //30 days
      res.json(user);
    }
  });
}

exports.dashboard = function(req, res){
	res.render('user/dashboard');
}

exports.logout = function(req, res){
  res.clearCookie('t');
  res.redirect('/');
}

exports.reset = function(req, res){
}