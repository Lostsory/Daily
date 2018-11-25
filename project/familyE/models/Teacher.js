const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 教员 schema
var teacherSchema = new Schema({
  //所在城市
  cityCode: {
    type: String,
    required: true
  },
  //姓名
  teacherName: {
    type: String,
    required: true
  },
  //身份类型
  typeId: {
    type: String,
    required: true
  },
  //手机号码 || 账号
  phone: {
    type: String,
    required: true
  },
  //密码
  pwd: {
    type: String,
    default: '123456'
  },
  //性别 0：未知，1：:男，2：女
  sex: {
    type: Number,
    required: false
  },
  // 详细地址
  address: {
    type: String,
    required: false
  },
  // 审核状态 0：未审核，1：已审核
  checkStatus: {
    type: String,
    default: 0
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
module.exports = teacher = mongoose.model('teacher', teacherSchema);