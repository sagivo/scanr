"use strict";

const ac = require('../app/controllers/application_controller');

module.exports = function(app){
  const home = require('../app/controllers/home_controller');
  app.get('/', home.index)
  app.get('/test', home.test);

  const users = require('../app/controllers/user_controller');
  app.post('/login', users.login);
  app.get('/logout', users.logout);
  app.get('/email', users.email);
  app.get('/reset', users.reset);
  app.get('/dashboard', ac.verify_cookie, users.dashboard);
  app.post('/card', ac.verify_cookie, users.card);
  app.get('/verify/:token', users.verify);
  app.get('/settings', users.settings);
};