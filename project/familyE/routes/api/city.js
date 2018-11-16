const express = require('express');
const router = express.Router();
const City = require('../../models/City');

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
* @description 注册接口
* @public
*/
router.post('/add', (req, res) => {
  const {code, cityName} = req.body;
  console.log('=======================================',req.body);
  // 查询是否存在
  City.findOne({ code }).then((city) => {
    if (city) {
      return res.status(400).json({
        msg: '已经开通该区域'
      })
    } else {
      const newCity = new City({
        cityName, code
      })
      newCity.save().then((city) => {
        res.send(city)
      })
    }
  })
})

module.exports = router
