/* const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});
 */
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  // transpileDependencies: "babel-loader",
  productionSourceMap: true,
  configureWebpack: {
    devtool: "source-map",
  },
});
