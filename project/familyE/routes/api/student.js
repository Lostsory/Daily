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
        newStudent.save().then((student) => {
          res.send({
            httpCode: '200',
            msg: '添加成功'
          })
          /* res.push({
            msg: '新注册一个学员',
            cityCode: student.cityCode
          }) */
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
  let {cityCode, pageSize, pageNum, isHome, checkStatus} = req.query
  console.log(isHome, '================')
  pageNum = parseInt(pageNum)
  pageSize = parseInt(pageSize)
  const query = {cityCode}
  isHome ? query.isHome = isHome : ''
  checkStatus ? query.checkStatus = checkStatus : ''
  Student.find(query).sort({'createTime': -1}).skip((pageNum-1)*pageSize).limit(pageSize).then((student) => {
    Student.countDocuments(query).then((total) => {
      res.send({
        data: student,
        total,
        httpCode: '200',
        msg: '请求成功'
      })
    })
  })
})

/**
* @api api/student/detail
* @description 学员详情接口
* @public
*/
router.get('/detail', (req, res) => {
  const {_id, isweb} = req.query;
  Student.findById(_id).then((student) => {
    isweb ? student.studentName = student.studentName[0] + '老师' : ''
    res.send({
      data: student,
      httpCode: '200',
      msg: '请求成功'
    })
  })
})

/**
* @api api/student/check
* @description 学员审核接口
* @public
*/
router.post('/check', (req, res) => {
  Student.update({_id:req.body._id}, {$set: {...req.body, checkStatus: '1' }}).then((success) => {
    console.log('=====================', success);
    res.send({
      httpCode: '200',
      msg: "审核通过"
    })
  })
})

module.exports = router
