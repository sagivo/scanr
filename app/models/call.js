const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var callSchema = new Schema({
  user : { type: Schema.Types.ObjectId, ref: 'User' },
  pages: Number,
  name: String,
  time: { type: Date, default: Date.now },
});

callSchema.statics.price_per_call = 0.01;
callSchema.set('autoIndex', true);

mongoose.model('Call', callSchema);
