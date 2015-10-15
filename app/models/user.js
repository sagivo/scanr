const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: {type: String, index: true, unique: true},
  token: {type: String, index: true, unique: true},
  card: {
    number: String,
    cvc: String,
    year: String,
    month: String,
    last_digits: String,
    token: String
  },
  password: String,
  verified: Boolean,
});
userSchema.set('autoIndex', true);


fpp = mongoose.model('User', userSchema);

//fpp.ensureIndexes(function(foo){
//  console.log(foo);
//});