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
  let {cityCode, pageSize, pageNum} = req.query;
  pageNum = parseInt(pageNum) || 1
  pageSize = parseInt(pageSize) || 6
  Student.find({cityCode}, {phone: 0, pwd: 0}).sort({'createTime': -1}).skip((pageNum-1)*pageSize).limit(pageSize).then((students) => {
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
    Student.countDocuments({cityCode}).then((total) => {
      res.send({
        data: newData,
        total,
        httpCode: '200',
        msg: '请求成功'
      })
    })
  })
})

/**
* @api api/home/teacher
* @description 首页推荐学员列表接口
* @public
*/
router.get('/teacher', (req, res) => {
  let {cityCode, pageSize, pageNum} = req.query;
  pageNum = parseInt(pageNum) || 1
  pageSize = parseInt(pageSize) || 8
  let exists = req.query.pageNum?true:false
  Teacher.find({cityCode, teachTime: {$exists: exists}}, {phone: 0, pwd: 0}).sort({'createTime': -1}).limit(8).then((teachers) => {
    const newData = teachers.map((item) => {
      return {
        name: item.teacherName[0] + '老师',
        remark: item.remark,
        teachTime: item.teachTime,
        finishSchool: item.finishSchool
      }
    })
    Teacher.countDocuments({cityCode, teachTime: {$exists: exists}}).then((total) => {
      res.send({
        data: newData,
        total,
        httpCode: '200',
        msg: '请求成功'
      })
    })
  })
})

module.exports = router
