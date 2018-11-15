const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const city = require('./city')

// 科目 schema
var subjectSchema = new Schema({
  //所在城市
  cityId: {
    type: ObjectId,
    ref: 'city'
  },
  // 科目名称
  subjectName: {
    type: String,
    required: true
  },
  gradeId: {
    type: ObjectId,
    ref: 'grade'
  }
})

module.exports = subject = mongoose.model('subject', subjectSchema);