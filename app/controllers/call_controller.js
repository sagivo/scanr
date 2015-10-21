"use strict";
const tesseract = require('node-tesseract');
const im = require('imagemagick');
const path =  require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Call = mongoose.model('Call');

const uploads_path = path.join(__dirname , '/../../uploads/')
const output_path = path.join(__dirname , '/../../output/')

exports.ocr = function(req, res){
  let full_file_name = 'p.pdf'
  let file_name = full_file_name.split('.')[0];

  pdf2Img(file_name, (err, data)=>{
    if (err) throw err;

    const file_names = fs.readdirSync(output_path).filter(v=>v.startsWith(file_name));
    const docs = new Array(file_names.length);
    let page_counter = 0;
    for (let i=0; i<file_names.length; i++) {
      tesseract.process(path.resolve(output_path, file_names[i]), (err, text) => {
        if(err) { console.log(err); res.render('test', {text: err}); }
        else {
          console.log(i,page_counter);
          docs[i] = text;
          if (page_counter++ == file_names.length-1) res.json(docs);
        }
      });
    }
  });
  Call.create({user: req.user.id, name: 'ocr'}, (err) => console.log(err) );
  req.user.update({$inc: {monthly_calls_count: 1}}, (err) => console.log(err));
}

function pdf2Img(file_name, cb){
  im.convert(['-density', '300', uploads_path+'p.pdf', '-quality', '100', '-sharpen', '0x1.0', output_path + file_name + '.png'], cb);
}
