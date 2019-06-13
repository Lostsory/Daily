class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    console.dir(compiler.hooks)
      compiler.hooks.run.tap('ConsoleLogOnBuildWebpackPlugin', compilation => {
          console.log("webpack 构建过程开始！");
      });
  }
}
module.exports = ConsoleLogOnBuildWebpackPlugin