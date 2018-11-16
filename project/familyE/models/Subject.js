const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 科目 schema
var subjectSchema = new Schema({
  cityCode: {
    type: String,
    required: true
  },
  // 科目名称
  subjectName: {
    type: String,
    required: true
  },
  // 年级id
  gradeId: {
    type: String,
    required: true
  },
  createTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = subject = mongoose.model('subject', subjectSchema);