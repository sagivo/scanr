"use strict";

const tesseract = require('node-tesseract');
const im = require('imagemagick');
const path =  require('path');
const fs = require('fs');

exports.index = function(req, res){
  res.render('home', {text: 'hello'});
}

exports.error = function(req, res){
  text = "";
  if (req.query.msg == "1") text = "incorrect password, try again";
  res.render('error', {text: text});
}

exports.test = function(req, res){
  console.log(req.file, req.body);
  res.end('bye\n');
}