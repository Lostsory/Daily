var express = require('express');
var router = express.Router();

/* var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://119.23.202.46:27017/";

var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
 */

/* GET users listing. */
router.post('/login', (req, res) => {
  console.log('req+_+_+_+_+_+_+_+_+_+_+_+', req);
  res.send({
    token: 'dasdh123jhasdx',
    httpCode: '200',
    msg: "登录成功"
  })
  /* MongoClient.connect(url, function (error, db) {
    var dbName = db.db('qzx');
    const { name, paw } = req.body;
    dbName.collection('user').findOne({name}, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        if (user) {
          let pawIsVaild = bcrypt.compareSync(paw, user.paw)
          if (pawIsVaild) {
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
  }) */
});

module.exports = router;