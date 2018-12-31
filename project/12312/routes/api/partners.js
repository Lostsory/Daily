const express = require('express');
const router = express.Router();
const Partners = require('../../models/Partners');

/**@api api/partners/add
* @description 测试接口
* @public
*/
router.get('/test', (req, res) => {
  res.send({
    msg: 'login works'
  })
})

/**@api api/partners/update
* @description 合作机构修改或新增
* @public
*/
router.post('/update', (req, res) => {
  if (req.body._id) {
    partner.update({_id:req.body._id}, {$set: {...req.body}}).then((success) => {
      res.send({
        httpCode: '200',
        msg: '操作成功'
      })
    })
  } else {
    const partner = new Partners({
      ...req.body
    })
    partner.save().then(() => {
      res.send({
        httpCode: '200',
        msg: '操作成功'
      })
    })
  }
})

/**
* @api api/partners/delete
* @description 合作机构删除接口
* @public
*/
router.delete('/delete', (req, res) => {
  const {_id} = req.query;
  Partners.deleteOne({_id}).then((success) => {
    res.send({
      httpCode: '200',
      msg: '删除成功'
    })
  })
})

/**
* @api api/partners/list
* @description 合作机构查询接口
* @private
*/
router.get('/list', (req, res) => {
  Partners.find().then((Partners) => {
    res.send({
      data: Partners,
      httpCode: '200',
      msg: '请求成功'
    })
  })
})

module.exports = router
