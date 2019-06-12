process.on('uncaughtException', function (err) {
  //打印出错误
  console.log(err);
  //打印出错误的调用栈方便调试
  console.log(err.stack);
});
// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// DB config
const db = require('./config/keys').mongodbUrl;

const options = {  
  server: {
      auto_reconnect: true,
      poolSize: 10
  }
};
// connect to mongodb
const mongo = require('mongoose');
mongo.connect(db, options).then(() => {
  console.log('============================mongodb connected============================');
}).catch((err) => {
  console.log(err);
})

/* const child = require('child_process');
const worker = child.fork('./wx/index.js'); */
// 设置跨域访问
app.use(function (req, res, next) {
  res.header("Cache-Control", "no-cache, no-store");
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,OPTIONS,DELETE")
  res.setHeader('Content-Type', 'application/json;charset=UTF-8')
  res.setHeader("Access-Control-Allow-Headers", "x-access-token, Content-Type")
  console.log(`${new Date().toLocaleString()}来了一拨请求, 请求路径是${req.url}`)

  // WebSocket配置
  /* res.push = function (data) {
    if (data instanceof Object) {
      var tranfer = JSON.stringify(data)
    }
    worker.send(tranfer)
  } */
  next()
})

var homeApi = require('./routes/api/home');
var cityApi = require('./routes/api/city');
var gradeApi = require('./routes/api/grade');
var subjectApi = require('./routes/api/subject');
var studentApi = require('./routes/api/student');
var responsiblePersonApi = require('./routes/api/responsiblePerson');
var teacherApi = require('./routes/api/teacher');
var userApi = require('./routes/api/user');
var partnerApi = require('./routes/api/partners');

// web前端首页接口
app.use('/api/home', homeApi);
app.use('/api/student', studentApi);
app.use('/api/teacher', teacherApi);


/* const jwt = require('jsonwebtoken');
// token验证
app.use(function(req, res, next) {
  if (req.method == 'OPTIONS') {
    return next()
  }
  var token = req.headers['x-access-token'];
  var noToken = {
    msg: '身份验证失败，请重新登录',
    httpCode: '401'
  };
  if (token) {   // token存在的话执行
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.send(noToken)
      } else {
        req.user_id = decoded
        next()
      }
    })
  } else {
    if (req.url == '/api/user/login') {
      return next()
    }
  }
}) */

// 后台管理接口
app.use('/api/city', cityApi);
app.use('/api/grade', gradeApi);
app.use('/api/subject', subjectApi);
app.use('/api/responsiblePerson', responsiblePersonApi);
app.use('/api/user', userApi);
app.use('/api/partner', partnerApi);

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
