var express = require('express');
var router = express.Router();
const ResponsiblePerson = require('../../models/ResponsiblePerson');
const Teacher = require('../../models/Teacher');
const Student = require('../../models/Student');

// var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');


/* GET users listing. */
router.post('/login', (req, res) => {
  const { account, passWord, cityCode } = req.body

  ResponsiblePerson.findOne({responsiblePhone: account}).then((user) => {
    if (!user) {
      Teacher.findOne({phone: account}).then((teacher) => {
        if (teacher) {
          if (teacher.pwd !== passWord) {
            res.send({
              httpCode: '-1',
              msg: "密码错误"
            })
          }
          const token = jwt.sign({ _id: teacher._id }, config.secret, {expiresIn: 86400 })  // token有效期为一天
          // 将token存在数据库中
          Teacher.update({_id: teacher._id}, {$set: {token}}).then(() => {
            res.send({
              token,
              userInfo: {
                cityCode: teacher.cityCode,
                phone: teacher.phone,
                userName: teacher.teacherName,
                identity: 'teacher',
                d: teacher._id
              },
              httpCode: '200',
              msg: "登录成功"
            })
          })
        } else {
          console.log('===========================================================');
          Student.findOne({phone: account}).then((student) => {
            if (student) {
              if (student.pwd !== passWord) {
                res.send({
                  httpCode: '-1',
                  msg: "密码错误"
                })
              }
              const token = jwt.sign({ _id: student._id }, config.secret, {expiresIn: 86400 })  // token有效期为一天
              // 将token存在数据库中
              Student.update({_id: student._id}, {$set: {token}}).then(() => {
                res.send({
                  token,
                  userInfo: {
                    cityCode: student.cityCode,
                    phone: student.phone,
                    userName: student.studentName,
                    identity: 'student',
                    d: student._id
                  },
                  httpCode: '200',
                  msg: "登录成功"
                })
              })
            } else {
              res.send({
                httpCode: '-1',
                msg: "此账号不存在"
              })
            }
          })
        }
      })
    } else {
      if (user.pwd == passWord) {
        // 平台超级管理员可以进入任何城市的后台
        if (user.cityCode == cityCode || user.identity == '0') {
          const token = jwt.sign({ _id: user._id }, config.secret, {expiresIn: 86400 })  // token有效期为一天
          
          // 将token存在数据库中
          ResponsiblePerson.update({_id: user._id}, {$set: {token}}).then(() => {
            res.send({
              token,
              userInfo: {
                cityCode: user.cityCode,
                phone: user.responsiblePhone,
                userName: user.responsibleName,
                identity: user.identity,
                d: user._id
              },
              httpCode: '200',
              msg: "登录成功"
            })
          })
        } else {
          res.send({
            httpCode: '-1',
            msg: "请联系管理员获取当前城市的管理权限"
          })
        }
      } else {
        res.send({
          httpCode: '-1',
          msg: "密码错误"
        })
      }
    }
  })
});

module.exports = router;