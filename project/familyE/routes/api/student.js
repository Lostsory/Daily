const express = require('express');
const router = express.Router();
const Student = require('../../models/Student');

/**
* @api api/student/add
* @description 学生增加接口
* @public
*/
router.post('/add', (req, res) => {
  // 查询是否存在
  Student.findOne({ phone: req.body.phone }).then((student) => {
    if (student) {
      return res.status(400).json({
        msg: '该手机号码已存在'
      })
    } else {
      const newStudent = new Student({
        ...req.body
      })
      newStudent.save().then(() => {
        res.send({
          httpCode: '200',
          msg: '添加成功'
        })
      })
    }
  })
})

/**
* @api api/student/delete
* @description 学生删除接口
* @public
*/
router.delete('/delete', (req, res) => {
  const {id} = req.query;
  Student.findByIdAndRemove(id).then((success) => {
    res.send({
      httpCode: '200',
      msg: '删除成功'
    })
  })
})

/**
* @api api/student/list
* @description 学生查询接口
* @public
*/
router.get('/list', (req, res) => {
  const {cityCode} = req.query;
  Student.find({cityCode}).then((student) => {
    res.send({
      data: student,
      httpCode: '200',
      msg: '请求成功'
    })
  })
})

module.exports = router
