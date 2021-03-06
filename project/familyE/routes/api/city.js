const express = require('express');
const router = express.Router();
const City = require('../../models/City');
const ResponsiblePerson = require('../../models/ResponsiblePerson');

/**@api api/city/test
* @description 测试接口
* @public
*/
router.get('/test', (req, res) => {
  res.send({
    msg: 'login works'
  })
})

/**
* @api api/city/add
* @description 城市开通接口
* @public
*/
router.post('/add', (req, res) => {
  const {code, cityName, responsibleName, responsiblePhone} = req.body;
  // 查询是否存在
  City.findOne({ code }).then((city) => {
    if (city) {
      return res.send({
        msg: '该区域已开通'
      })
    } else {
      const newCity = new City({
        ...req.body
      })
      newCity.save().then(() => {
        const newRes = new ResponsiblePerson({
          cityName, cityCode: code, responsibleName, responsiblePhone, identity: '1',  
        })
        newRes.save().then(() => {
          res.send({
            httpCode: '200',
            msg: '开通成功'
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
  const {code} = req.query;
  City.deleteOne({code}).then((success) => {
    ResponsiblePerson.deleteMany({cityCode: code}).then(() => {
      res.send({
        httpCode: '200',
        msg: '删除成功'
      })
    })
  })
})

/**
* @api api/city/list
* @description 开通城市查询接口
* @private
*/
router.get('/list', (req, res) => {
  let {pageSize, pageNum} = req.query;
  pageNum = parseInt(pageNum) || 0
  pageSize = parseInt(pageSize) || 0
  City.find({}, {homeSetting: 0}).sort({'createTime': -1}).skip((pageNum-1)*pageSize).limit(pageSize).then((city) => {
    City.count().then((total) => {
      res.send({
        data: city,
        total,
        httpCode: '200',
        msg: '请求成功'
      })
    })
  })
})

module.exports = router
