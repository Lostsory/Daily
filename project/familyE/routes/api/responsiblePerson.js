const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 负责人 schema
var responsiblePersonSchema = new Schema({
  cityId: {
    type: ObjectId,
    ref: 'city'
  },
  // 负责人姓名
  responsibleName: {
    type: String,
    required: true
  },
  // 负责人手机号码
  responsiblePhone: {
    type: String,
    required: true
  },
  // 负责人身份
  identity: {

  }
})

module.exports = responsiblePerson = mongoose.model('responsiblePerson', responsiblePersonSchema);