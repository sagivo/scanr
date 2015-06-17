var tesseract = require('node-tesseract');

exports.index = function(req, res){
  tesseract.process(__dirname + '/1.png', function(err, text) {
    if(err) console.error(err);
    else {
      console.log(text);
      res.render('home', {text: text});
    }
  });
}