var express = require('express');
var app = express();

app.set('views', 'app/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

require('./config/routes')(app);

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;
});