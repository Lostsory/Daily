const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 合作机构 schema
var partnerSchema = new Schema({
  // 机构名称
  h1: {
    type: String,
    required: true
  },
  // 一级标题
  h2: {
    type: String,
    required: true
  },
  // 机构简介
  p: {
    type: String,
    required: true
  },
  // 网址链接
  href: {
    type: String,
    required: false
  },
  createTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = partner = mongoose.model('partner', partnerSchema)