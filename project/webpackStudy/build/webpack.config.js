const path = require('path')
const myPlugin = require('../src/plugin/myPlugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: '../src/index.js',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'index.js'
  },
  plugins: [
    new myPlugin()
  ]
}