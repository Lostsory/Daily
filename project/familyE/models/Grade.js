const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 年级 schema
var gradeSchema = new Schema({
  //所在城市
  cityId: {
    type: ObjectId,
    ref: 'city'
  },
  // 年级名称
  gradeName: {
    type: String,
    required: true
  }
})

module.exports = grade = mongoose.model('grade', gradeSchema)