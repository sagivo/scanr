"use strict";
const path =  require('path');
var fs = require('fs');

const secrets = require('../../config/secrets');
var AWS = require('aws-sdk');
var s3 = new AWS.S3({credentials: {accessKeyId: secrets.aws.accessKeyId, secretAccessKey: secrets.aws.secretAccessKey}});

const uploads_path = path.join(__dirname , '/../../uploads');
const multer = require('multer');
const upload  = multer({
  fileSize: 4194304, fieldNameSize: 500,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const full_path = `${uploads_path}/${req.user.id}`;
      if (!fs.existsSync(full_path)) fs.mkdirSync(full_path);
      cb(null, full_path);
    },
    filename: (req, file, cb) => cb(null, Date.now()+ '-' + file.originalname)
  })
});

exports.index = function(req, res){
  res.render('home');
}

exports.terms = function(req, res){
  res.render('terms');
}

exports.faq = function(req, res){
  res.render('faq');
}

exports.how = function(req, res){
  res.render('how');
}

exports.error = function(req, res){
  let text = "";
  if (req.query.msg == "1") text = "incorrect password, try again";
  res.render('error', {text: text});
}

exports.test = function(req, res){
  res.json({text: 'foo'})
}
