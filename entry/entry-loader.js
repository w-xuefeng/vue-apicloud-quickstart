const loaderUtils = require('loader-utils');
const path = require('path');
const fs = require('fs');

module.exports = function() {
  const content = fs.readFileSync(path.join(__dirname, '..', 'generator/template/src/main.js')).toString();
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
