const webpack = require('webpack')

const webpackConfig = require('./webpack.config.js')

webpack(webpackConfig, (err,  stats) => {
  if (err) throw err
})
