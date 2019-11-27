const loaderUtils = require('loader-utils');
const fs = require('fs');
const { resolve, tempEntry } = require('./entry');

module.exports = function() {
  const content = fs.readFileSync(resolve(tempEntry.entry)).toString();
  if (this.resourceQuery) {
    const { page } = loaderUtils.parseQuery(this.resourceQuery);
    if (page) {
      return content.replace(
        /'(.*?)'/,
        `'@/pages/${page.replace(/\\/g, '/')}'`
      );
    }
  }
  return content;
};
