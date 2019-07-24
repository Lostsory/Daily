var express = require('express');
var router = express.Router();
var fs = require('fs');


var AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;

// 设置APPID/AK/SK
var APP_ID = "16812301";
var API_KEY = "G3N5ditGCV5E0EGYoT6kIP0o";
var SECRET_KEY = "Fk6dKWAnGTxm3bQicIx6HptwxrGlXrOH";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);

var HttpClient = require("baidu-aip-sdk").HttpClient;

// 设置request库的一些参数，例如代理服务地址，超时时间等
// request参数请参考 https://github.com/request/request#requestoptions-callback
HttpClient.setRequestOptions({timeout: 5000});

// 也可以设置拦截每次请求（设置拦截后，调用的setRequestOptions设置的参数将不生效）,
// 可以按需修改request参数（无论是否修改，必须返回函数调用参数）
// request参数请参考 https://github.com/request/request#requestoptions-callback
HttpClient.setRequestInterceptor(function(requestOptions) {
    // 查看参数
    console.log(requestOptions)
    // 修改参数
    requestOptions.timeout = 5000;
    // 返回参数
    return requestOptions;
});

var image = fs.readFileSync('demo.jpg').toString("base64");
// 调用通用物体识别
client.logoSearch(image).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
});

/* // 如果有可选参数
var options = {};

// 带参数调用通用物体识别
client.advancedGeneral(image, options).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
}); */


/* router.get('/test', (req, res) => {
// var image = fs.readFileSync('../demo.jpg').toString("base64");
  res.send('请求成功')
})
router.get('/rubbishImg', (req, res) => {
  var image = fs.readFileSync('../demo.jpg').toString("base64");
  // 调用通用物体识别
  client.advancedGeneral(image).then(function(result) {
      console.log(JSON.stringify(result));
  }).catch(function(err) {
      // 如果发生网络错误
      console.log(err);
  });

  // 如果有可选参数
  var options = {};
  options["baike_num"] = "5";

  // 带参数调用通用物体识别
  client.advancedGeneral(image, options).then(function(result) {
      console.log(JSON.stringify(result));
  }).catch(function(err) {
      // 如果发生网络错误
      console.log(err);
  });
})
module.exports = router; */

[
    {"score":0.32546,"root":"商品-容器","keyword":"杯子"},
    {"score":0.23458,"root":"商品-容器","keyword":"马克杯"},
    {"score":0.158285,"root":"商品-清洁工具","keyword":"垃圾桶"},
    {"score":0.08322,"root":"商品-容器","keyword":"玻璃杯"},
    {"score":0.007534,"root":"商品-五金","keyword":"缸套"}
]
