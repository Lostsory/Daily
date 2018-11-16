const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 学员 schema
var studentSchema = new Schema({
  //所在城市
  cityCode: {
    type: String,
    required: true
  },
  //家长姓名
  studentName: {
    type: String,
    required: true
  },
  //家长手机号码 || 账号
  phone: {
    type: String,
    required: true
  },
  //密码
  pwd: {
    type: String,
    required: true
  },
  // 详细地址
  address: {
    type: String,
    required: false
  },
  //性别 0：未知，1：:男，2：女
  sex: {
    type: String,
    required: false
  },
  //子女年级
  gradeId: {
    type: String,
    required: false
  },
  // 所在学校
  school: {
    type: String,
    required: false
  },
  // 备注
  remark: {
    type: String,
    required: false
  },
  // 创建时间
  createTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = student = mongoose.model('student', studentSchema);