const { createEntries } = require('./script/entry');
module.exports = {
  outputDir: 'dist',
  publicPath: './',
  filenameHashing: false,
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://api.wangxuefeng.com.cn/',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // },
  pages: (console.log(createEntries()), createEntries())
};
