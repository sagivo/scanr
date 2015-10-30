const helpers_general = require('../helpers/general.js')
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.verify_token = function(req, res, next){
  token = req.query.token
  if (!token) return res.status(401).json({error: 'must specify token'});
  User.findOne({token: token}, function (err, user){
    if (user){
      res.locals.user = req.user = user;
      next();
    } else return res.status(401).json({error: 'unknown token'});
  });
}

exports.verify_cookie = function(req, res, next){
  if (res.locals.user || req.path == '/') next();
  else return res.redirect('/');
}

exports.all_web = function(req, res, next){
  res.locals.path = req.path;
  res.locals.user = null;
  req.token = helpers_general.parseCookies(req).t;
  if (req.token)
    User.findOne({token: req.token}, function (err, user){
      if (user) res.locals.user = req.user = user;
      next();
    });
  else next();
}