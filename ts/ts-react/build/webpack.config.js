var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.config');
var devConfig = require('./webpack.dev.config');
var prodConfig = require('./webpack.prod.config');

const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;

module.exports = merge(baseConfig, config)