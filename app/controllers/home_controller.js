"use strict";
const path =  require('path');

const uploads_path = path.join(__dirname , '/../../uploads/')
const multer = require('multer');
const upload  = multer({
  fileSize: 4194304, fieldNameSize: 500, dest: 'uploads/',
  storage: multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploads_path);
  },
  filename: (req, file, cb) => {
    console.log('here');
    cb(null, Date.now()+ '-' + file.originalname);
  }})
});

exports.index = function(req, res){
  res.render('home', {text: 'hello'});
}

exports.error = function(req, res){
  text = "";
  if (req.query.msg == "1") text = "incorrect password, try again";
  res.render('error', {text: text});
}

exports.test = function(req, res){
  const upload_name = 'file';
  upload.single(upload_name)(req, res, (err) => {
    if (err) return res.json({error: `must to have "${upload_name}" attribute`});
    console.log(req.file, req.body);
    res.end('bye\n');
  });
}