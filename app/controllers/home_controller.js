var tesseract = require('node-tesseract');

exports.index = function(req, res){
  res.render('home', {text: 'hello'});
}

exports.error = function(req, res){
  text = "";
  if (req.query.msg == "1") text = "incorrect password, try again";
  res.render('error', {text: text});
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