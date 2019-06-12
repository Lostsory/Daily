const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 预约订单 schema
var SubscribeSchema = new Schema({
  //所在城市
  cityCode: {
    type: String,
    required: true
  },
  teacherId: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true
  },
  teacher: {
    type: Object,
    required: false
  },
  student: {
    type: Object,
    required: false
  },
  comment: {
    type: Array,
    required: false,
    default: []
  },
  check: {
    type: String,
    required: false,
    default: '2'
  },
  // 创建时间
  createTime: {
    type: Date,
    default: Date.now
  }
});
module.exports = subscribe = mongoose.model('subscribe', SubscribeSchema);