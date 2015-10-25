const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var fileSchema = new Schema({
  user : { type: Schema.Types.ObjectId, ref: 'User' },
  text: String,
  url: String,
  time: { type: Date, default: Date.now },
});

fileSchema.set('autoIndex', true);

mongoose.model('File', fileSchema);
