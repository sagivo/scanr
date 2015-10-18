const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Call = mongoose.model('Call');
const Bill = mongoose.model('Bill');

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

userSchema.methods.bills = function(cb){
  Bill.find({user: this.id}, cb);
};

userSchema.methods.monthly_bill = function(){
  return (this.monthly_calls_count > 100) ? 5 + this.monthly_calls_count * Call.price_per_call : 0;
}

userSchema.set('autoIndex', true);

fpp = mongoose.model('User', userSchema);

//fpp.ensureIndexes(function(foo){
//  console.log(foo);
//});