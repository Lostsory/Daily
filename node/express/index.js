/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

var express = require('./lib/express');

var app = express()

var router = express.Router()
router.get('/', function (req, res) {
  res.send({
    express: 'app'
  })
})


app.use('/', router)

app.get('/test', function (req,res) {
  res.send('test')
})

app.listen(3000, function () {
  console.log('connected');
})

console.log(express());
module.exports = express

