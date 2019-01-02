const express = require('express');
const router = express.Router();
const Student = require('../../models/Student.js');
const Teacher = require('../../models/Teacher.js');
const City = require('../../models/City.js');

/**
* @api api/home/homeInfo
* @description 当前城市主页信息查询
* @private
*/
router.get('/homeInfo', (req, res) => {
  City.findOne({code: req.query.cityCode}).then((city) => {
    res.send({
      data: city,
      httpCode: '200',
      msg: '请求成功'
    })
  })
})

/**
* @api api/home/homeInfoUpdata
* @description 当前城市主页信息修改
* @private
*/
router.post('/homeInfoUpdata', (req, res) => {
  const {cityCode, ...homeSetting} = req.body
  City.updateOne({code: cityCode}, {$set: {homeSetting}}).then((success) => {
    res.send({
      httpCode: '200',
      msg: "修改成功"
    })
  })
})

/**
* @api api/home/stundent
* @description 首页推荐学员列表接口
* @public
*/
router.get('/student', (req, res) => {
  let {cityCode, pageSize, pageNum} = req.query;
  pageNum = parseInt(pageNum) || 1
  pageSize = parseInt(pageSize) || 6
  Student.find({cityCode, checkStatus: 1}, {phone: 0, pwd: 0}).sort({'createTime': -1}).skip((pageNum-1)*pageSize).limit(pageSize).then((students) => {
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
    Student.countDocuments({cityCode, checkStatus: 1}).then((total) => {
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
* @description 首页推荐教员列表接口
* @public
*/
router.get('/teacher', (req, res) => {
  let {cityCode, pageSize, pageNum} = req.query;
  pageNum = parseInt(pageNum) || 1
  pageSize = parseInt(pageSize) || 8
  // let exists = req.query.pageNum?true:false
  Teacher.find({cityCode, checkStatus: 1}, {phone: 0, pwd: 0}).sort({'createTime': -1}).skip((pageNum-1)*pageSize).limit(pageSize).then((teachers) => {
    const newData = teachers.map((item) => {
      return {
        name: item.teacherName[0] + '老师',
        remark: item.remark,
        teachTime: item.teachTime,
        finishSchool: item.finishSchool
      }
    })
    Teacher.countDocuments({cityCode, checkStatus: 1}).then((total) => {
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
