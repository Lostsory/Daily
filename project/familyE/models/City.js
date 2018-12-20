const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const defaultHome = require('../config/homeContent');

// 开通城市 schema
var citySchema = new Schema({
  cityName: {
    type: String,
    required: true
  },
  code: {
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
  // 首页设置
  homeSetting: {
    type: Object,
    default: defaultHome
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

module.exports = city = mongoose.model('city', citySchema);
