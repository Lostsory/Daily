const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 负责人 schema
var responsiblePersonSchema = new Schema({
  cityCode: {
    type: String,
    required: true
  },
  cityName: {
    type: String,
    required: true
  },
  // 负责人姓名
  responsibleName: {
    type: String,
    required: true
  },
  // 负责人手机号码 || 账号
  responsiblePhone: {
    type: String,
    required: true
  },
  // 密码
  pwd: {
    type: String,
    default: '123456'
  },
  // 负责人身份 0：平台超级管理员，1: 超级管理员，2:普通管理员,
  identity: {
    type: String,
    required: true
  },
  remark: {
    type: String,
    required: false
  },
  createTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = responsiblePerson = mongoose.model('responsiblePerson', responsiblePersonSchema);