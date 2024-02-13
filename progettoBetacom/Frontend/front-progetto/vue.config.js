/* const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});
 */
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("tailwindcss"),
          require("autoprefixer"),
          // Add any other PostCSS plugins you need here
        ],
      },
    },
  },
});
