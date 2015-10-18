"use strict";

const mongoose = require('mongoose');
const secrets = require('../../config/secrets.js');
const User = mongoose.model('User');
const crypt = require('dead-simple-crypt', secrets.CRYPT_KEY);

exports.login = function(req, res){
  User.findOne({email: req.body.email}, function(err, user){
    if (err) return res.redirect('/error');
    if (user){
      if (user.password == crypt.encrypt(req.body.password) ){
        res.cookie('t', user.token, {expires: new Date(Date.now() + 30 * 24 * 3600000) }); //30 days
        res.redirect('dashboard');
      } else return res.redirect('/error?msg=1');
    } else { //create new
      let token = crypt.gui();
      User.create({email: req.body.email, password: crypt.encrypt(req.body.password), token: token}, function(err, user){
        if (user) {
          res.redirect('email');
        } else return res.redirect('/error');
      });
    }
  });
}

exports.dashboard = function(req, res){
	res.render('user/dashboard', {user: req.user});
}

exports.email = function(req, res){
  res.render('user/email');
}

exports.verify = function(req, res){
  User.findById(req.params.id, function(err, user){
    if (user && !user.verified) {
      user.verified = true;
      user.save(function(err){
        console.log('saved');
        if (!err) {
          res.cookie('t', user.token, {expires: new Date(Date.now() + 30 * 24 * 3600000) }); //30 days
          res.redirect('/dashboard');
        } else return res.redirect('/error');
      });
    } else res.redirect('/error');
  });
}

exports.logout = function(req, res){
  res.clearCookie('t');
  res.redirect('/');
}

exports.reset = function(req, res){
}

exports.card = function(req, res){
  req.user.card.number = crypt.encrypt(req.body.number);
  req.user.card.last_digits = req.body.number.substr(req.body.number.length - 4);
  req.user.card.year = req.body.year;
  req.user.card.month = req.body.month;
  req.user.card.token = req.body.token;
  req.user.card.cvc = req.body.cvc;
  req.user.save( err => res.redirect('/dashboard') );
}

exports.calls = function(req, res){
  req.user.monthly_calls( (err, calls) => res.render('user/calls', {calls: calls}) );
}

exports.bills = function(req, res){
  req.user.bills( (err, bills) => res.render('user/bills', {bills: bills}) );
}

exports.settings = function(req, res){
  res.render('user/settings');
}
