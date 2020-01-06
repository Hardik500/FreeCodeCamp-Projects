var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  original_url: {
    type: String,
    trim: true
  },
  short_url: {
    type: Number
  }
});

module.exports = mongoose.model('url', urlSchema);