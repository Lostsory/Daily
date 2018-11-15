var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://119.23.202.46:27017/";

const jwt = require('jsonwebtoken');
const config = require('../config');

router.use(function(req, res, next) {
  console.log('reqMethod======================== is indexRouter.use');
  next()
})

/* GET users listing. */
router.post('/login', function(req, res, next) {
  MongoClient.connect(url, function (error, db) {
    var dbName = db.db('qzx');
    const { name, paw } = req.body;
    dbName.collection('user').findOne({name}, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        if (user) {
          if (paw === user.paw) {
            let token = jwt.sign({ _id: user._id }, config.secret, {expiresIn: 3600 // expires in 30 min
            });
            res.send({ auth: true, token, user: user, msg: '登录成功', httpCode: '0' });
          } else {
            res.send({ auth: false, token: null, msg: '密码错误', httpCode: '-1' })
          }
        } else {
          res.send({
            msg: '该用户不存在'
          });
        }
      }
    })
  })
});

module.exports = router;
