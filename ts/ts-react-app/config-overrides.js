var { fixBabelImports, override, addWebpackAlias } = require('customize-cra')
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = override(
  fixBabelImports('babel-plugin-import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addWebpackAlias({
    "interface": resolve("src/interface"),
    "baseComonents": resolve("src/components/base"),
    "antComonents": resolve("src/components/ant"),
  })
)