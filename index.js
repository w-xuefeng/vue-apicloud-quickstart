module.exports = (api, projectOptions) => { 
  require('./entry')(api, projectOptions);
  require('./utils/gen')(api);
}