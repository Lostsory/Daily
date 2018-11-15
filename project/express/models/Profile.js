const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 创建 schema
const PropfileSchema = new Schema({
  type: {
    type: String,
  },
  desc: {
    type: String,
  },
  income: {
    type: String,
    required: true
  },
  expend: {
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  remark: {
    type: String
  },
  creatData: {
    type: String,
    default: Date.now
  }
})
module.exports = User = mongoose.model('propfile', PropfileSchema);