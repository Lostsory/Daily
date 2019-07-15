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




// 设置跨域访问
app.use(function (req, res, next) {
  res.header("Cache-Control", "no-cache, no-store");
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,OPTIONS,DELETE")
  res.setHeader('Content-Type', 'application/json;charset=UTF-8')
  res.setHeader("Access-Control-Allow-Headers", "x-access-token, Content-Type")
  console.log(`${new Date().toLocaleString()}来了一拨请求, 请求路径是${req.url}`)
  next()
})



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
