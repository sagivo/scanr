"use strict";
const secrets = require('../../config/secrets');
const tesseract = require('node-tesseract');
const im = require('imagemagick');
const path =  require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Call = mongoose.model('Call');
const User = mongoose.model('User');
const File = mongoose.model('File');
const acceptable_types = new Set(['pdf', 'bmp', 'pnm', 'png', 'jpg', 'jpeg', 'tiff', 'gif', 'ps', 'webp']);

const upload_name = 'file';
const converted_pdf_format = 'png';
const uploads_path = path.join(__dirname , '/../../uploads')
const multer = require('multer');
const upload  = multer({
  fileSize: 4194304, fieldNameSize: 500,
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploads_path);
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  })
});

exports.ocr = function(req, res){
  upload.single(upload_name)(req, res, (err) => {
    // console.log(req.file);
    // return res.end('aa');
    const file_type = req.file.originalname.split('.').pop().toLowerCase();
    if (!acceptable_types.has(file_type)) {return res.status(500).json({error: 'unsupported file type'}); fs.unlink(req.file.path);}

    //handle image types
    if (file_type != 'pdf'){
      tesseract.process(req.file.path, (err, text) => {
        uploadS3(req.file.path, req.user.id, Date.now() + '-' + req.file.originalname, (err, data) => {
          res.status(200).json({text: text});
          File.create({user: req.user.id, text: text, url: data.Location}, (err) => {if (err) throw err;} );
        });
        fs.unlink(req.file.path);
        updateCounts(req.user.id, 1);
      });
    }
    //handle pdf
    else if (file_type == 'pdf'){
      const file_name = req.file.filename;
      console.log('file_name',file_name);
      pdf2Img(file_name, (err, data)=>{
        if (err) throw err;

        const file_names = fs.readdirSync(uploads_path).filter(v=>v.startsWith(file_name.split('.')[0]) && v.length > file_name.length);
        const docs = new Array(file_names.length);
        let page_counter = 0;
        for (let i=0; i<file_names.length; i++) {
          //ocr each file
          const pdf2image_path = path.resolve(uploads_path, file_names[i]);
          tesseract.process(pdf2image_path, (err, text) => {
            if(err) { console.log(err); res.render('test', {text: err}); }
            else {
              docs[i] = text;
              //upload files to s3, create file in db, delete file in fs
              uploadS3(pdf2image_path, req.user.id, file_names[i], (err, data) => {
                if (err) throw err;
                File.create({user: req.user.id, text: text, url: data.Location}, (err) => {if(err) throw err;} );
                fs.unlink(pdf2image_path, (err, data) => {if (err) throw err;});
              });
              if (page_counter++ == file_names.length-1) {
                res.status(200).json({text: docs});
                fs.unlink(req.file.path, (err, data) => {if (err) throw err;});
              }
            }
          });
        }
        updateCounts(req.user.id, file_names.length);
      });
    }
  });
}

function pdf2Img(file_name, cb){
  im.convert(['-density', '300', `${uploads_path}/${file_name}`, '-quality', '100', '-sharpen', '0x1.0', `${uploads_path}/${file_name.split('.')[0]}.${converted_pdf_format}`], cb);
}

function updateCounts(user_id, pages){
  Call.create({user: user_id, name: 'ocr', pages: pages}, (err) => {if(err) throw err;} );
  User.findByIdAndUpdate(user_id, {$inc: {monthly_calls_count: pages}}, (err) => {if(err) throw err;} );
}

const AWS = require('aws-sdk');
const s3 = new AWS.S3({credentials: {accessKeyId: secrets.aws.accessKeyId, secretAccessKey: secrets.aws.secretAccessKey}});

function uploadS3(file_path, bucket, key, cb){
  fs.readFile(file_path, (err, file) => {
    s3.upload({Bucket: secrets.aws.s3_main_bkt_name + '/' + bucket, Key: key, Body: file, ACL: 'public-read'}).send(cb);
  });
}
