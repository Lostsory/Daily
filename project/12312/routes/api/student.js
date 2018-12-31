const express = require('express');
const router = express.Router();
const Student = require('../../models/Student');
const Grade = require('../../models/Grade');

/**
* @api api/student/add
* @description 学生增加接口
* @public
*/
router.post('/add', (req, res) => {
  // 查询是否存在
  Student.findOne({ phone: req.body.phone }).then((student) => {
    if (student) {
      return res.send({
        msg: '该手机号码已存在'
      })
    } else {
      Grade.findById(req.body.gradeId).then((grade) => {
        const newStudent = new Student({
          ...req.body, gradeName: grade.gradeName
        })
        newStudent.save().then(() => {
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
  let {cityCode, pageSize, pageNum} = req.query;
  pageNum = parseInt(pageNum)
  pageSize = parseInt(pageSize)
  Student.find({cityCode}).sort({'createTime': -1}).skip((pageNum-1)*pageSize).limit(pageSize).then((student) => {
    Student.countDocuments({cityCode}).then((total) => {
      res.send({
        data: student,
        total,
        httpCode: '200',
        msg: '请求成功'
      })
    })
  })
})

module.exports = router
