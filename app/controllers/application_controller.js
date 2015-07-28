const helpers_general = require('../helpers/general.js')
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.verify_token = function(req, res, next){
  token = req.query.token
  if (!token) res.json({error: 'must specify token'});
  User.findOne({token: token}, function (err, user){
    if (user){
      res.locals.user = req.user = user;
      next();
    } else res.json({error: 'unknown token'});
  });
}

exports.verify_cookie = function(req, res, next){
  if (!req.token) res.redirect('/');
  User.findOne({token: req.token}, function (err, user){
    if (user){
      req.user = user;
      next();
    } else res.redirect('/');
  });
}
