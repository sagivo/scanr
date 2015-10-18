var tesseract = require('node-tesseract');

exports.index = function(req, res){
  res.render('home', {text: 'hello'});
}

exports.test = function(req, res){
  tesseract.process(__dirname + '/../../uploads/1.png', function(err, text) {
    if(err) {
      console.log(err);
      res.render('test', {text: err});
    }
    else {
      console.log(text);
      res.render('test', {text: text});
    }
  });
}