const entry = require('./entry')
const gen = require('./utils/gen')

module.exports = (api, projectOptions) => { 
  entry(api, projectOptions);
  gen(api);
}