"use strict";

const mongoose = require('mongoose');
const secrets = require('../../config/secrets.js');
const User = mongoose.model('User');
const crypt = require('dead-simple-crypt', secrets.CRYPT_KEY);

exports.login = function(req, res){
  User.findOne({email: req.body.email, password: crypt.encrypt(req.body.password)}, function(err, user){
    if (err) return res.redirect('/err');
    if (user){
      res.cookie('t', user.token, {expires: new Date(Date.now() + 30 * 24 * 3600000) }); //30 days
      res.redirect('dashboard');
    } else { //create new
      let token = crypt.gui();
      User.create({email: req.body.email, password: crypt.encrypt(req.body.password), token: token}, function(err, user){
        if (user) {
          res.cookie('t', token, {expires: new Date(Date.now() + 30 * 24 * 3600000) }); //30 days
          res.redirect('email');
        } else return res.redirect('/err');
      });
    }
  });
}

exports.dashboard = function(req, res){
  console.log(req.user);
	res.render('user/dashboard', {user: req.user});
}

exports.email = function(req, res){
  res.render('user/email');
}

exports.verify = function(req, res){
  User.findOne({token: req.params.token}, function(err, user){
    if (user) {
      user.verified = true;
      user.save(function(err){
        if (user) {
          res.cookie('t', req.params.token, {expires: new Date(Date.now() + 30 * 24 * 3600000) }); //30 days
          console.log("going to dash");
          res.redirect('/dashboard');
        } else return res.redirect('/?flash=danger--Oops, something bad happened. Please try again.--');
      });
    } else res.redirect('/err');
  });
}

exports.logout = function(req, res){
  res.clearCookie('t');
  res.redirect('/');
}

exports.reset = function(req, res){
}

exports.card = function(req, res){
  console.log(req.body);
  req.user.card.number = crypt.encrypt(req.body.number);
  req.user.card.last_digits = req.body.number.substr(req.body.number.length - 4);
  req.user.card.year = req.body.year;
  req.user.card.month = req.body.month;
  req.user.card.token = req.body.token;
  req.user.card.cvc = req.body.cvc;
  req.user.save( err => res.redirect('/dashboard') );
}

exports.settings = function(req, res){
  res.render('user/settings');
}
