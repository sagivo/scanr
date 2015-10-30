"use strict";

const ac = require('../app/controllers/application_controller');

module.exports = function(app){
  const home = require('../app/controllers/home_controller');
  app.get('/', ac.all_web, ac.verify_cookie, home.index)
  app.all('/test', ac.all_web, ac.verify_token, home.test);
  app.get('/error', ac.all_web, home.error);

  const users = require('../app/controllers/user_controller');
  app.post('/login', users.login);
  app.get('/logout', users.logout);
  app.get('/email', users.email);
  app.get('/reset', users.reset);
  app.get('/dashboard', ac.all_web, ac.verify_cookie, users.dashboard);
  app.post('/card', ac.all_web, ac.verify_cookie, users.card);
  app.get('/verify/:id', users.verify);
  app.get('/settings', users.settings);
  app.get('/calls', ac.all_web, ac.verify_cookie, users.calls);
  app.get('/bills', ac.all_web, ac.verify_cookie, users.bills);

  const call = require('../app/controllers/call_controller');
  app.all('/ocr', ac.verify_token, call.ocr);

};