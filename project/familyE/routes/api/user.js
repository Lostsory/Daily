var express = require('express');
var router = express.Router();
const ResponsiblePerson = require('../../models/ResponsiblePerson');

/* var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://119.23.202.46:27017/";

var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
 */

/* GET users listing. */
router.post('/login', (req, res) => {
  const { account, passWord, cityCode } = req.body

  ResponsiblePerson.findOne({responsiblePhone: account}).then((user) => {
    console.log(user);
    if (!user) {
      res.send({
        httpCode: '-1',
        msg: "此账号不存在"
      })
    } else {
      if (user.pwd == passWord) {
        // 平台超级管理员可以进入任何城市的后台
        if (user.cityCode == cityCode || user.identity == '0') {
          res.send({
            token: 'dasdh123jhasdx',
            userInfo: {
              cityCode: user.cityCode,
              phone: user.responsiblePhone,
              userName: user.responsibleName,
              identity: user.identity
            },
            httpCode: '200',
            msg: "登录成功"
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