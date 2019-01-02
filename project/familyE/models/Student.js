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
    default: '123456'
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
  // 年级名称
  gradeName: {
    type: String,
    required: false
  },
  // 所在学校
  school: {
    type: String,
    required: false
  },
  // 所补科目
  subjectIds: {
    type: Array,
    required: true
  },
  // 期望课费
  expectFee: {
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
  },
  // 审核状态 0：未审核，1：已审核
  checkStatus: {
    type: String,
    default: 0
  }
});

module.exports = student = mongoose.model('student', studentSchema);