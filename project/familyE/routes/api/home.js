const express = require('express');
const router = express.Router();
const Student = require('../../models/Student.js');
const Teacher = require('../../models/Teacher.js');
const Subscribe = require('../../models/Subscribe.js');
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
  let {cityCode, pageSize, pageNum} = req.query
  pageNum = parseInt(pageNum)
  pageSize = parseInt(pageSize)
  const query = {cityCode, checkStatus: 1}
  pageNum && pageSize ? '' :  query.isHome = 1
  Student.find(query, {phone: 0, pwd: 0}).sort({'createTime': -1}).skip((pageNum-1)*pageSize).limit(pageSize || 20).then((students) => {
    const newData = students.map((item) => {
      var subjects = ''
      item.subjectIds.forEach(element => {
        subjects += element.subjectName + ','
      });
      return {
        name: item.studentName[0] + '同学',
        subjects,
        remark: item.remark,
        gradeName: item.gradeName,
        _id: item._id
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
* @api api/home/subscribe
* @description 教员预约接口
* @public
*/
router.post('/subscribe', (req, res) => {
  const {teacherId, studentId} = req.body
  Teacher.findById(teacherId).then((teacher) => {
    Student.findById(studentId).then(student => {
      const newSubscribe = new Subscribe({
        ...req.body,
        teacher,
        student
      })
      newSubscribe.save().then(() => {
        res.send({
          httpCode: '200',
          msg: '预约成功'
        })
      })
    })
  })
})

/**
* @api api/home/subscribeUpdate
* @description 教员预约列表
* @public
*/
router.post('/subscribeUpdate', (req, res) => {
  const {_id, check, cityCode} = req.body
  console.log('================', req.body);
  Subscribe.update({
    _id, cityCode
  }, {
    $set: {
      check 
    }
  }).then(() => {
    res.send({
      msg: '操作成功',
      httpCode: '200'
    })
  })
})


/**
* @api api/home/subscribeList
* @description 教员预约列表
* @public
*/
router.get('/subscribeList', (req, res) => {
  const {teacherId, studentId, cityCode, check} = req.query
  const query = {cityCode}
  if (teacherId) {
    query.teacherId = teacherId
  } else if (studentId) {
    query.studentId = studentId
  } else if(check) {
    query.check = check
  }
  Subscribe.find(query).sort({'createTime': -1}).then((list) => {
    res.send({
      msg: '请求成功',
      httpCode: '200',
      list
    })
  })
})

/**
* @api api/home/comment
* @description 教员预约列表
* @public
*/
router.post('/commentAdd', (req, res) => {
  const {teacherId, studentId, studentIdName, content, createTime} = req.body
  Subscribe.find({
    teacherId, studentId, check: '3'
  }).then((subscribe) => {
    if (subscribe.length == 1) {
      Subscribe.updateOne({
        teacherId, studentId
      }, {
        '$push': {
          comment: {
            studentIdName, content, createTime
          }
        }
      }).then(() => {
        res.send({
          msg: '评价成功',
          httpCode: '200'
        })
      })
    } else {
      res.send({
        msg: '对不起，您尚未成功预约该老师',
        httpCode: '-1'
      })
    }
  })
  
})

/**
* @api api/home/teacher
* @description 首页推荐教员列表接口
* @public
*/
router.get('/teacher', (req, res) => {
  let {cityCode, pageSize, pageNum, teachTime, typeId, sex, remark} = req.query;
  pageNum = parseInt(pageNum)
  pageSize = parseInt(pageSize)
  const reg = new RegExp(remark, 'i')
  // let exists = req.query.pageNum?true:false
  const query = {
    cityCode,
    checkStatus: 1,
    typeId: typeId || {$exists: true},
    sex: sex || {$exists: true},
    $or: [
      {
        remark: {$regex : reg}
      },
      {
        teacherName: {$regex : reg}
      }
    ]
  }
  teachTime ? query.teachTime = { $gt: teachTime } : ''
  pageNum && pageSize ? '' :  query.isHome = 1
  Teacher.find(query, {phone: 0, pwd: 0}).sort({'createTime': -1}).skip((pageNum-1)*pageSize).limit(pageSize || 20).then((teachers) => {
    const newData = teachers.map((item) => {
      return {
        name: item.teacherName[0] + '老师',
        remark: item.remark,
        teachTime: item.teachTime,
        finishSchool: item.finishSchool,
        _id: item._id
      }
    })
    Teacher.countDocuments(query).then((total) => {
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
