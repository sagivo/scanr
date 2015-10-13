"user strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const secrets = require('./config/secrets');
console.log(secrets.MONGODB_URI);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//TODO: UNCOMMENT 
//app.use(require('multer')({limits: {fieldSize: 4000000}, dest: './uploads/'})); // 4mb

app.set('views', 'app/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect(secrets.MONGODB_URI, function(err, status){ if (err) return console.error(err); else console.log("connected to db"); });
require('./config/init')(app);
require('./config/routes')(app);


const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`running at port ${port}`)
});