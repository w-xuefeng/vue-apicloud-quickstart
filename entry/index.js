module.exports = (api, projectOptions) => {
  const pageConfig = require(api.resolve('src/config/page'));
  const { buildConfig, tempEntry } = require('../config')
  const { createEntries, entriesLoader } = require('../utils')

  projectOptions = {
    ...projectOptions,
    ...buildConfig,
    pages: createEntries(pageConfig, tempEntry)
  };

  api.chainWebpack(webpackConfig => {
    entriesLoader(api, webpackConfig, tempEntry);
  })
}

