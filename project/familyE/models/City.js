const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 开通城市 schema
var citySchema = new Schema({
  cityName: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
})

module.exports = city = mongoose.model('city', citySchema);
