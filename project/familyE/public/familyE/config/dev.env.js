'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:9000"',
  WSURL: '"ws://localhost:9100"',
  CITY_CODE: '0'
})
