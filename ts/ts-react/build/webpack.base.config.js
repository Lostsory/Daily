var Configuration = require('webpack').Configuration;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkTsWebapck = require('fork-ts-checker-webpack-plugin')
// const { CheckerPlugin } = require('awesome-typescript-loader')

/**
 * @type {Configuration}
 */
const config = {
  entry: {
    'app': './src/index.tsx',
  },
  output: {
    filename: '[name].[chunkhash:8].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [{
          loader: 'ts-loader',
          // loader: 'awesome-typescript-loader',
          options: {
            transpileOnly: true
          }
        }],
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new ForkTsWebapck()
    // new CheckerPlugin() // 类型检查会有遗漏
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}

module.exports = config