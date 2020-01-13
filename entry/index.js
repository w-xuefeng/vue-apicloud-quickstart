const app = require('@vue/cli-service/lib/config/app.js');

module.exports = (api, projectOptions) => {
  const pageConfig = require(api.resolve('src/config/page'));
  const { buildConfig, tempEntry } = require('../config');
  const { createEntries, entriesLoader } = require('../utils');

  app(api, { ...projectOptions, ...buildConfig, pages: createEntries(api, pageConfig, tempEntry) });
  api.chainWebpack(webpackConfig => {
    entriesLoader(api, webpackConfig, tempEntry);
  })
}
