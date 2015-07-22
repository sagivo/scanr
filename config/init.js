"use strict";

const fs = require('fs');
const models_path = require('path').resolve(__dirname,'../app/models');

module.exports = function(app){
  fs.readdirSync(models_path).forEach(function(file){
    require(`${models_path}/${file}`)
  });
}