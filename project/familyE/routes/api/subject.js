const express = require('express');
const router = express.Router();
const Subject = require('../../models/Subject');

/**
* @api api/subject/add
* @description 科目增加接口
* @public
*/
router.post('/add', (req, res) => {
  const {subjectName, gradeId, cityCode} = req.body;
  // 查询是否存在

  Subject.findOne({ subjectName, gradeId }).then((subject) => {
    if (subject) {
      return res.send({
        msg: '已存在此科目'
      })
    } else {
      const newSubject = new Subject({
        subjectName, gradeId, cityCode
      })
      newSubject.save().then(() => {
        res.send({
          httpCode: '200',
          msg: '添加成功'
        })
      })
    }
  })
})

/**
* @api api/subject/delete
* @description 科目删除接口
* @public
*/
router.delete('/delete', (req, res) => {
  const {id} = req.query;
  Subject.findByIdAndRemove(id).then((success) => {
    res.send({
      httpCode: '200',
      msg: '删除成功'
    })
  })
})

/**
* @api api/subject/list
* @description 科目查询接口
* @public
*/
router.get('/list', (req, res) => {
  const {cityCode, gradeId} = req.query;
  let query = {cityCode}
  if (gradeId) {
    query = {cityCode, gradeId}
  }
  Subject.find(query).sort({'createTime': -1}).then((subject) => {
    res.send({
      data: subject,
      httpCode: '200',
      msg: '请求成功'
    })
  })
})

module.exports = router
