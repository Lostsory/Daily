var Configuration = require('webpack').Configuration;
var CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

/**
 * @type {Configuration}
 */
const config = {
  plugins: [
    new CleanWebpackPlugin()
  ]
}

module.exports = config