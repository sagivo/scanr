const tesseract = require('node-tesseract');
const mongoose = require('mongoose');
const Call = mongoose.model('Call');

exports.ocr = function(req, res){
  tesseract.process(__dirname + '/../../uploads/1.png', function(err, text) {
    if(err) {
      console.log(err);
      res.render('test', {text: err});
    }
    else {
      console.log(text);
      res.end(text);
    }
  });
  Call.create({user: req.user.id, name: 'ocr'}, (err) => console.log(err) );
  req.user.update({$inc: {monthly_calls_count: 1}}, (err) => console.log(err));
}
