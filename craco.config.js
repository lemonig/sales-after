const {
  when,
  whenDev,
  whenProd,
  whenTest,
  ESLINT_MODES,
  POSTCSS_MODES,
  loaderByName,
} = require("@craco/craco");
const path = require("path");
const CracoLessPlugin = require("craco-less");
const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);
module.exports = {
  mode: "development",
  devServer: {
    port: 3001,
  },
  webpack: {
    alias: {
      "@Components": pathResolve("src/components"),
      "@": pathResolve("src"),
    },
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
