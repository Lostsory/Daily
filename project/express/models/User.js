const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 创建 schema
const UserSchema = new Schema({
  account: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
  },
  data: {
    type: String,
    default: Date.now
  },
  // 0:普通员工， 1：管理员
  identity: {
    type: String,
    required: true
  },
})
module.exports = User = mongoose.model('Users', UserSchema);