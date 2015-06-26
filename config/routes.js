"use strict";

module.exports = function(app){
  let home = require('../app/controllers/home_controller');
  app.get('/', home.index)

  let users = require('../app/controllers/user_controller');
  app.post('/login', users.login);
  app.get('/dashboard', users.dashboard);
};