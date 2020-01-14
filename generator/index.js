module.exports = (api, options) => {
  const { getIPAdress, getEntries } = require('../utils');
  const pageConfig = require(api.resolve('src/config/page'));
  require('./render')(api, {
    ...options,
    ip: getIPAdress(),
    port: options.port || 8080,
    entries: getEntries(pageConfig)
  })
  if (api.hasPlugin('eslint')) {
    api.onCreateComplete(() => {
      require('@vue/cli-plugin-eslint/lint')({}, api)
    })
  }
}
