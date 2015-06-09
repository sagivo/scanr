var express = require('express');
var app = express();
var tesseract = require('node-tesseract');

app.set('views', 'app/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res) {
  console.log(__dirname + '/1.png');
  tesseract.process(__dirname + '/1.png',function(err, text) {
    if(err) console.error(err);
    else {
      console.log(text);
      res.render('home', {text: text});
    }
  });
});

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;
});