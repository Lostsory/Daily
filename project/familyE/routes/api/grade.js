const express = require('express');
const router = express.Router();
const Grade = require('../../models/Grade');

/**
* @api api/grade/add
* @description 年级增加接口
* @public
*/
router.post('/add', (req, res) => {
  const {gradeName, cityCode} = req.body;
  console.log('=======================================',req.body);
  // 查询是否存在
  Grade.findOne({ gradeName, cityCode }).then((grade) => {
    if (grade) {
      return res.status(400).json({
        msg: '已存在此年级'
      })
    } else {
      const newGrade = new Grade({
        gradeName, cityCode
      })
      newGrade.save().then((grade) => {
        res.send({
          httpCode: '200',
          msg: '添加成功'
        })
      })
    }
  })
})

/**
* @api api/grade/delete
* @description 年级删除接口
* @public
*/
router.delete('/delete', (req, res) => {
  const {id} = req.query;
  Grade.findByIdAndRemove(id).then((success) => {
    res.send({
      httpCode: '200',
      msg: '删除成功'
    })
  })
})

/**
* @api api/grade/list
* @description 年级查询接口
* @public
*/
router.get('/list', (req, res) => {
  const {cityCode} = req.query;
  Grade.find({cityCode}).then((grade) => {
    res.send({
      data: grade,
      httpCode: '200',
      msg: '请求成功'
    })
  })
})

module.exports = router
