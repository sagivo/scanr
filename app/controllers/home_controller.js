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
  const uploads_path = path.join(__dirname , '/../../uploads/')
  const output_path = path.join(__dirname , '/../../output/')
  const full_file_name = 'p.pdf'

  const file_name = full_file_name.split('.')[0];
  im.convert(['-density', '300', uploads_path+'p.pdf', '-quality', '100', '-sharpen', '0x1.0', output_path + file_name + '.png'], (err, stdout) => {
    if (err) throw err;

    const file_names = fs.readdirSync(output_path).filter(v=>v.startsWith(file_name));
    const docs = new Array(file_names.length);
    let counter = 0;
    for (let i=0; i<file_names.length; i++) {
      tesseract.process(path.resolve(output_path, file_names[i]), (err, text) => {
        if(err) { console.log(err); res.render('test', {text: err}); }
        else {
          console.log(i,counter);
          docs[i] = text;
          if (counter++ == file_names.length-1) res.json(docs);
        }
      });
    }
  });
}