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
      return res.send({
        msg: '该手机号码已存在'
      })
    } else {
      const newTeacher = new Teacher({
        ...req.body
      })
      newTeacher.save().then((teacher) => {
        res.send({
          httpCode: '200',
          msg: '添加成功'
        })
        res.push(teacher)
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
* @api api/teacher/detail
* @description 老师详情接口
* @public
*/
router.get('/detail', (req, res) => {
  const {_id} = req.query;
  Teacher.findById(_id).then((teacher) => {
    res.send({
      data: teacher,
      httpCode: '200',
      msg: '请求成功'
    })
  })
})

/**
* @api api/teacher/check
* @description 老师审核接口
* @public
*/
router.post('/check', (req, res) => {
  Teacher.update({_id:req.body._id}, {$set: {...req.body, checkStatus: '1' }}).then((success) => {
    console.log('=====================', success);
    res.send({
      httpCode: '200',
      msg: "审核通过"
    })
  })
})

/**
* @api api/teacher/list
* @description 老师查询接口
* @public
*/
router.get('/list', (req, res) => {
  let {cityCode, pageSize, pageNum} = req.query;
  pageNum = parseInt(pageNum)
  pageSize = parseInt(pageSize)
  Teacher.find({cityCode}).sort({'createTime': -1}).skip((pageNum-1)*pageSize).limit(pageSize).then((teacher) => {
    Teacher.countDocuments({cityCode}).then((total) => {
      res.send({
        data: teacher,
        total,
        httpCode: '200',
        msg: '请求成功'
      })
    })
  })
})

module.exports = router
