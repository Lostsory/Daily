const express = require('express');
const router = express.Router();
const ResponsiblePerson = require('../../models/ResponsiblePerson');
const City = require('../../models/City');

/**
* @api api/responsiblePerson/add
* @description 负责人增加接口
* @public
*/
router.post('/add', (req, res) => {
  // 查询是否存在
  ResponsiblePerson.findOne({ responsiblePhone: req.body.responsiblePhone, cityCode: req.body.cityCode }).then((responsiblePerson) => {
    if (responsiblePerson) {
      return res.send({
        msg: '该手机号码已存在'
      })
    } else {
      City.findOne({code: req.body.cityCode}).then((city) => {
        const newResponsiblePerson = new ResponsiblePerson({
          ...req.body, cityName: city.cityName, identity: '2'
        })
        newResponsiblePerson.save().then(() => {
          res.send({
            httpCode: '200',
            msg: '添加成功'
          })
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
  let {identity, pageNum, pageSize} = req.query;
  if (identity !== '0') {
    res.send({
      httpCode: '403',
      msg: '请联系管理员，您暂时无该权限'
    })
  }
  pageNum = parseInt(pageNum)
  pageSize = parseInt(pageSize)
  ResponsiblePerson.find().sort({'createTime': -1}).skip((pageNum-1)*pageSize).limit(pageSize).then((responsiblePerson) => {
    ResponsiblePerson.count().then((total) => {
      res.send({
        data: responsiblePerson,
        total,
        httpCode: '200',
        msg: '请求成功'
      })
    })
  })
})

module.exports = router
