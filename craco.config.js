const {
  when,
  whenDev,
  whenProd,
  whenTest,
  ESLINT_MODES,
  POSTCSS_MODES,
  loaderByName,
} = require("@craco/craco");
const CracoLessPlugin = require("craco-less");

module.exports = {
  mode: "development",
  devServer: {
    port: 3001,
  },
  babel: {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            chrome: "49",
            ios: "10",
          },
        },
      ],
    ],
  },

  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // 主题色配置
            //https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
