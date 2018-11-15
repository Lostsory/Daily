process.on('uncaughtException', function (err) {
  //打印出错误
  console.log(err);
  //打印出错误的调用栈方便调试
  console.log(err.stack);
});
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

// token设置
const jwt = require('jsonwebtoken');
const config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 设置跨域访问
app.use(function (req, res, next) {
  res.header("Cache-Control", "no-cache, no-store");
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,OPTIONS,DELETE")
  res.setHeader('Content-Type', 'application/json;charset=UTF-8')
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE,x-access-token"); // 如有特别需要可开启此项
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next()
})

// token验证
app.all('*', function(req, res, next) {
  if (req.method != 'OPTIONS') {
    var token = req.headers['x-access-token'];
    var noToken = {
      msg: '身份验证失败，请重新登录',
      httpCode: '401'
    };
    if (token) {   // token存在的话执行
      if (req.url == '/users/login') {
        return next()
      }
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          return res.send(noToken)
        } else {
          req.user_id = decoded
          next()
        }
      })
    } else {
      return res.send(noToken)
    }
  } else {
    next()
  }
})

// 处理接收到的_id
var ObjectId = require('mongodb').ObjectId;
app.all('*', function(req, res, next) {
  var reqMethod = req.method
  if (reqMethod == 'POST' || reqMethod == 'PUT') {
    req.body._id = ObjectId(req.body._id)
  } else {
    if (req.query.hasOwnProperty('_id')) {
      req.query._id = ObjectId(req.query._id)
    }
  }
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
