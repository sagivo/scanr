var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(require('multer')({limits: {fieldSize: 4000000}, dest: './uploads/'})); // 4mb

app.set('views', 'app/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

require('./config/routes')(app);

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, function(){ console.log("connected to db"); });


var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log(`running at port ${port}`)
});