const path = require('path')

module.exports = {
  outputDir: 'dist',
  publicPath: './',
  filenameHashing: false,
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        'vue-apicloud-quickstart': path.resolve('../../src')
      }
    }
  },
  devServer: {
    disableHostCheck: true
  }
}
