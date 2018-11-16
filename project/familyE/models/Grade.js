const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const city = require('./City');
// 年级 schema
var gradeSchema = new Schema({
  //所在城市
  cityCode: {
    type: String,
  },
  // 年级名称
  gradeName: {
    type: String,
    required: true
  },
  createTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = grade = mongoose.model('grade', gradeSchema)