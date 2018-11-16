const express = require('express');
const router = express.Router();
const ResponsiblePerson = require('../../models/ResponsiblePerson');

/**
* @api api/responsiblePerson/add
* @description 负责人增加接口
* @public
*/
router.post('/add', (req, res) => {
  // 查询是否存在
  ResponsiblePerson.findOne({ responsiblePhone: req.body.responsiblePhone }).then((responsiblePerson) => {
    if (responsiblePerson) {
      return res.status(400).json({
        msg: '该手机号码已存在'
      })
    } else {
      const newResponsiblePerson = new ResponsiblePerson({
        ...req.body
      })
      newResponsiblePerson.save().then(() => {
        res.send({
          httpCode: '200',
          msg: '添加成功'
        })
      })
    }
  })
})

/**
* @api api/responsiblePerson/delete
* @description 负责人删除接口
* @public
*/
router.delete('/delete', (req, res) => {
  const {id} = req.query;
  ResponsiblePerson.findByIdAndRemove(id).then((success) => {
    res.send({
      httpCode: '200',
      msg: '删除成功'
    })
  })
})

/**
* @api api/responsiblePerson/list
* @description 负责人查询接口
* @private
*/
router.get('/list', (req, res) => {
  const {identity} = req.query;
  if (identity !== '0') {
    res.status(403).send({
      httpCode: '403',
      msg: '请联系管理员，您暂时无该权限'
    })
  }
  ResponsiblePerson.find().then((responsiblePerson) => {
    res.send({
      data: responsiblePerson,
      httpCode: '200',
      msg: '请求成功'
    })
  })
})

module.exports = router
