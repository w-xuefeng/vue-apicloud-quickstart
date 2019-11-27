const { createEntries, entriesLoader } = require('./script/entry');
module.exports = {
  outputDir: 'dist',
  publicPath: './',
  filenameHashing: false,
  pages: createEntries(),
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://targeturl:port/',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // },
  chainWebpack: config => entriesLoader(config)
};
