const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

console.log(path.resolve(__dirname, './././././././././dist'), "===========>>>>>", __dirname)

module.exports = {
  entry: './src/main.js',
  devtool: 'inline-source-map',
  /* devServer: {
    contentBase: './dist'
  }, */
  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './././././././././dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack起步哦',
      template: './index.html'
    }),
    new VueLoaderPlugin()
  ],
};