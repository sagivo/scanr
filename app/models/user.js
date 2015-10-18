const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Call = mongoose.model('Call');

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
  calls : [{ type: Schema.Types.ObjectId, ref: 'Call' }],
  monthly_calls_count: {type: Number, default: 0}
});

userSchema.methods.monthly_calls = function(cb){
  Call.find({user: this.id}, cb);
};

userSchema.methods.monthly_bill = function(){
  return 5 + this.monthly_calls_count * Call.price_per_call;
}

userSchema.set('autoIndex', true);

fpp = mongoose.model('User', userSchema);

//fpp.ensureIndexes(function(foo){
//  console.log(foo);
//});