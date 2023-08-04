/*
 * @Author: Jonny
 * @Date: 2022-06-27 10:44:49
 * @LastEditors: Jonny
 * @LastEditTime: 2023-08-04 09:42:32
 * @FilePath: \after-sales\src\setupProxy.js
 */
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/*", // 指定需要转发的请求
    createProxyMiddleware({
      // target: "http://192.168.188.3:5678/", //服务器的地址
      target: "http://portal.greandata1.com/", //服务器的地址
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api",
      },
      // pathRewrite(path) {
      //   return path.replace('/api', '');
      // }
    })
  );
};
