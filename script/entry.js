const path = require('path');
const pageConfig = require('../src/config/page');

const tempEntry = {
  template: 'public/index.html',
  chunks: ['chunk-vendors', 'chunk-common', 'index'],
  entry: 'src/main.js',
  filename: '',
  title: ''
};

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

function createEntries() {
  return pageConfig.reduce((result, page) => {
    if (!page.path) {
      console.err(`page path must be required!`);
    }
    const pageName = page.path.replace(/\/(\w)/, (match, $1) =>
      $1.toLocaleLowerCase()
    );
    result[pageName] = {
      ...tempEntry,
      title: page.title,
      chunks: ['chunk-vendors', 'chunk-common', pageName],
      entry: `${tempEntry.entry}?page=${page.path}`,
      filename: `${pageName}.html`
    };
    return result;
  }, {});
}

function entriesLoader(config) {
  config.module
    .rule('entry')
    .test(resolve(tempEntry.entry))
    .use('entry-loader')
    .loader(resolve('script/entry-loader.js'))
    .end();
}

module.exports = { tempEntry, createEntries, entriesLoader, resolve };
