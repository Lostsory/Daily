var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://119.23.202.46:27017/";

const jwt = require('jsonwebtoken');

/**
 * 列表数据获取
 * @param {require} pageSize - 一页数据量
 * @param {require} pageNum - 当前页码
 * @param name - 用户名
 * @param orderType - 排序方式（按成绩降序-1，按成绩升序1）
 */
router.get('/list', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbName = db.db('qzx');
    var total;
    const {pageSize, pageNum, name, orderType} = req.query;
    var query = {}; // 模糊搜索
    if (name) {
      query['name'] = {$regex: new RegExp(name)}
    }
    var sortWay = {createTime: -1}; // 排序
    if (orderType) {
      sortWay = {};
      sortWay['grade'] = parseInt(orderType)
    }
    // 获取文档总数
    dbName.collection('user').countDocuments(query, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        total = result
        dbName.collection('user').aggregate([
          {
            $match: {grade: {$gte : 60}},
            $group: {_id: '$name'}
          }
        ], function (err, result) {
          if (err) {
            console.log(err);
          }
          result.toArray(function(err, result) {
            console.log('result+++++++++++++++++++++++++++', result);
            dbName.collection('user').find(query, {
              skip: (parseInt(pageNum) - 1) * parseInt(pageSize),
              limit: parseInt(pageSize),
              sort: sortWay,
              projection: {createTime: 0}
            }).toArray(function(err, result) {
              if (err) throw err;
              res.send({
                list: result,
                total,
                httpCode: '0'
              });
              db.close();
            })
          })
        })
      }
    })
  });
})

/**
 * 数据添加
 * @param {require} paw - 密码
 * @param {require} grade - 成绩
 * @param {require} name - 用户名
 */
router.post('/add', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbName = db.db('qzx');
    const {name, paw, grade} = req.body;
    dbName.collection('user').findOne({name}, function(err, result) {
      if (err) {
        console.log(err)
      } else {
        if (result) {
          res.send({
            msg: '该用户已存在',
            httpCode: '-1'
          })
        } else {
          dbName.collection('user').insertOne({
            name,
            grade: parseInt(grade),
            paw,
            createTime: Date.parse(new Date())
          }, function(err, result) {
            if (err) throw err;
            res.send({
              msg: '添加成功',
              httpCode: '0'
            })
          })
        }
      }
    })
  });
})

/**
 * 数据删除
 * @param {require} _id - objectId
 */
router.delete('/delete', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbName = db.db('qzx');
    dbName.collection('user').deleteOne({
      _id: req.query._id
    }, function(err, result) {
      if (err) throw err;
      res.send({
        msg: '删除成功',
        httpCode: '0'
      })
    })
  });
})

/**
 * 数据更新
 * @param {require} _id - objectId
 * @param {require} paw - 密码
 * @param {require} grade - 成绩
 * @param {require} name - 用户名
 */
router.put('/update', function(req, res, next) {
  console.log('========================== is indexRouter');
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
    } else {
      var dbName = db.db('qzx');
      const {name, paw, grade, _id} =req.body
      dbName.collection('user').updateOne({ _id }, { $set: { name, paw, grade } }, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send({
            msg: '修改成功',
            httpCode: '0'
          })
        }
      })
    }
  });
})

module.exports = router;
