const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var billSchema = new Schema({
  user : { type: Schema.Types.ObjectId, ref: 'User' },
  total: Number,
  status: String, //open, closed
  time: { type: Date, default: Date.now },
});

mongoose.model('Bill', billSchema);
