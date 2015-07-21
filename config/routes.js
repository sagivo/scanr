"use strict";

var ac = require('../app/controllers/application_controller');

module.exports = function(app){
  const home = require('../app/controllers/home_controller');
  app.get('/', home.index)

  const users = require('../app/controllers/user_controller');
  app.post('/login', users.login);
  app.get('/dashboard', ac.verify, users.dashboard);
};