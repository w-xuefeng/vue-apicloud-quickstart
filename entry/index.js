module.exports = (api, projectOptions) => {
  const pageConfig = require(api.resolve('src/config/page'));
  const { buildConfig, tempEntry } = require('../config');
  const { createEntries, entriesLoader } = require('../utils');

  api.chainWebpack(webpackConfig => {
    projectOptions = {
      ...projectOptions,
      ...buildConfig,
      pages: createEntries(pageConfig, tempEntry)
    }
    entriesLoader(api, webpackConfig, tempEntry);
  })
}

