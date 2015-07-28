"use strict";

const mongoose = require('mongoose');
const secrets = require('../../config/secrets.js');
const User = mongoose.model('User');
var crypt = require('dead-simple-crypt', secrets.CRYPT_KEY);

exports.login = function(req, res){
  User.findOne({email: req.body.email, password: crypt.encrypt(req.body.password)}, function(err, user){
    if (user){
      res.cookie('t', user.token, {expires: new Date(Date.now() + 30 * 24 * 3600000) }); //30 days
      res.redirect('/dashboard?flash=success--Welcome back!--')
    } else {
      res.redirect('/dashboard?flash=danger--Wrong email/password. Please try again.--')
    }
  });
}

exports.register = function(req, res){
  let token = crypt.gui();
  User.create({email: req.body.email, password: crypt.encrypt(req.body.password), token: token}, function(err, user){
    if (err) res.redirect('dashboard?flash=danger--Oops, something bad happened. Please try again.--');
    if (user){
      res.cookie('t', token, {expires: new Date(Date.now() + 30 * 24 * 3600000) }); //30 days
      res.redirect('dashboard?flash=success--Welcome! Please check your email to verify the account.--')
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

exports.settings = function(req, res){
  res.render('user/settings');
}
