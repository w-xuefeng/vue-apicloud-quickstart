const loaderUtils = require('loader-utils');

module.exports = function() {
  const content = `import App from './app';
import { initApp } from '@/plugins';

initApp(App);`;
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
