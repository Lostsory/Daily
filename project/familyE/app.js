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

/* // WebSocket配置
var app = express();
var wsapp = require('express-ws')(wsapp);
app.ws('/notice', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
  });
});
wsapp.listen(3000); */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// DB config
const db = require('./config/keys').mongodbUrl;

// connect to mongodb
const mongo = require('mongoose');
mongo.connect(db).then(() => {
  console.log('============================mongodb connected============================');
}).catch((err) => {
  console.log(err);
})

// 设置跨域访问
app.use(function (req, res, next) {
  res.header("Cache-Control", "no-cache, no-store");
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,OPTIONS,DELETE")
  res.setHeader('Content-Type', 'application/json;charset=UTF-8')
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE,x-access-token"); // 如有特别需要可开启此项
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  console.log(new Date() + '来了一拨请求');
  next()
})

var cityApi = require('./routes/api/city');
var gradeApi = require('./routes/api/grade');
var subjectApi = require('./routes/api/subject');
var studentApi = require('./routes/api/student');
var responsiblePersonApi = require('./routes/api/responsiblePerson');
var teacherApi = require('./routes/api/teacher');
var userApi = require('./routes/api/user');
var homeApi = require('./routes/api/home');
var partnerApi = require('./routes/api/partners');

app.use('/api/city', cityApi);
app.use('/api/grade', gradeApi);
app.use('/api/subject', subjectApi);
app.use('/api/student', studentApi);
app.use('/api/responsiblePerson', responsiblePersonApi);
app.use('/api/teacher', teacherApi);
app.use('/api/user', userApi);
app.use('/api/home', homeApi);
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
