const express = require('express');
const router = express.Router();
const Student = require('../../models/Student.js');
const Teacher = require('../../models/Teacher.js');

/**
* @api api/home/stundent
* @description 首页推荐学员列表接口
* @public
*/
router.get('/student', (req, res) => {
  let {cityCode} = req.query;
  Student.find({cityCode}, {phone: 0, pwd: 0}).sort({'createTime': -1}).limit(6).then((students) => {
    const newData = students.map((item) => {
      var subjects = ''
      item.subjectIds.forEach(element => {
        subjects += element.subjectName + ','
      });
      return {
        name: item.studentName[0] + '同学',
        subjects,
        remark: item.remark,
        gradeName: item.gradeName
      }
    })
    res.send({
      data: newData,
      httpCode: '200',
      msg: '请求成功'
    })
  })
})

/**
* @api api/home/teacher
* @description 首页推荐学员列表接口
* @public
*/
router.get('/teacher', (req, res) => {
  let {cityCode} = req.query;
  Teacher.find({cityCode, teachTime: {$exists: true}}, {phone: 0, pwd: 0}).sort({'createTime': -1}).limit(8).then((teachers) => {
    const newData = teachers.map((item) => {
      return {
        name: item.teacherName[0] + '老师',
        remark: item.remark,
        teachTime: item.teachTime,
        finishSchool: item.finishSchool
      }
    })
    res.send({
      data: newData,
      httpCode: '200',
      msg: '请求成功'
    })
  })
})

module.exports = router
