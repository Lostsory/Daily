const express = require('express');
const router = express.Router();
const Teacher = require('../../models/Teacher');

/**
* @api api/teacher/add
* @description 老师增加接口
* @public
*/
router.post('/add', (req, res) => {
  // 查询是否存在
  Teacher.findOne({ phone: req.body.phone }).then((teacher) => {
    if (teacher) {
      return res.status(400).json({
        msg: '该手机号码已存在'
      })
    } else {
      const newTeacher = new Teacher({
        ...req.body
      })
      newTeacher.save().then(() => {
        res.send({
          httpCode: '200',
          msg: '添加成功'
        })
      })
    }
  })
})

/**
* @api api/teacher/delete
* @description 老师删除接口
* @public
*/
router.delete('/delete', (req, res) => {
  const {id} = req.query;
  Teacher.findByIdAndRemove(id).then((success) => {
    res.send({
      httpCode: '200',
      msg: '删除成功'
    })
  })
})



/**
* @api api/teacher/list
* @description 老师查询接口
* @public
*/
router.get('/list', (req, res) => {
  const {cityCode} = req.query;
  Teacher.find({cityCode}).then((teacher) => {
    res.send({
      data: teacher,
      httpCode: '200',
      msg: '请求成功'
    })
  })
})

module.exports = router
