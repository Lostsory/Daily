'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackConfig = require('./webpack.prod.conf')
const env = require('../config/prod.env')

const { mongodbUrl } = require('../../../config/keys')
const mongo = require('mongoose')
const City = require('../../../models/City')

mongo.connect(mongodbUrl).then(() => {
  City.find({}, { homeSetting: 0 }).then((citys) => {
    // 移除dist目录
    rm.sync(config.build.assetsRoot)
    const basePath = webpackConfig.output.path
    const plugins = webpackConfig.plugins

    const buildItem = (city) => new Promise((resolve, reject) => {
      const { code, cityName } = city

      const spinner = ora(`building for ${cityName}...`)
      spinner.start()

      // 修改cityCode
      env.CITY_CODE = JSON.stringify(code)
      plugins[0].definitions['process.env'] = env

      // 生成多个index.html
      const newHtml = new HtmlWebpackPlugin({
        filename: path.join(basePath, `${cityName}/index.html`),
        template: 'index.html',
        inject: true,
        favicon: path.join(__dirname, '..', 'favicon.ico'),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      })
      webpackConfig.plugins = [...plugins, newHtml]

      // 修改输出目录
      webpackConfig.output.path = path.join(basePath, cityName)

      webpack(webpackConfig, (err, stats) => {
        if (err) {
          reject()
          throw err
        } else {
          spinner.stop()
          if (stats.hasErrors()) {
            console.log(chalk.red(`${cityName}  Build failed with errors.\n`))
            process.exit(1)
          }
          console.log(chalk.cyan(`${cityName}  Build complete.\n`))
          resolve(cityName)
        }
      })
    })

    const buildList = async(dataArr, handel) => {
      var result = []
      for (const item of dataArr) {
        var ret = await handel(item)
        result.push(ret)
      }
      return result
    }

    buildList(citys, buildItem).then((result) => {
      if (result.length === citys.length) {
        console.log(chalk.cyan(`${result.length}座城市 Build complete.\n`))
        console.log(chalk.yellow(
          '  Tip: built files are meant to be served over an HTTP server.\n' +
          '  Opening index.html over file:// won\'t work.\n'
        ))
        process.exit()
      }
    })
  })
})
