const glob = require('glob');
const path = require('path');
const fs = require('fs');
const pageConfig = require('../src/config/page');

const tempEntry = {
  template: 'public/index.html',
  chunks: ['chunk-vendors', 'chunk-common', 'index'],
  entry: '',
  filename: '',
  title: ''
};

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

function getPages() {
  let vues = [];
  glob.sync(resolve('src/pages/**/*.vue')).forEach(pathname => {
    vues.push(pathname.replace(/[\w|\W|\s|\S]*\/src\/pages\/|\.\w*$/g, ''));
  });
  return vues;
}

function createEntries() {
  const jsTempPath = 'node_modules/.temp';
  const pages = getPages();
  const tempLateJsContent = fs.readFileSync(resolve('src/main.js')).toString();
  if (!fs.existsSync(resolve(jsTempPath))) {
    fs.mkdirSync(resolve(jsTempPath));
  }
  return pages.reduce((result, page) => {
    const jsFileName = `${jsTempPath}/${page.replace(/\/(\w)/, (match, $1) =>
      $1.toLocaleLowerCase()
    )}`;
    fs.writeFileSync(
      `${jsFileName}.js`,
      tempLateJsContent.replace(/'(.*?)'/, `'@/pages/${page}'`)
    );
    const pageName = page.replace(/\/(\w)/, (match, $1) =>
      $1.toLocaleLowerCase()
    );
    result[pageName] = {
      ...tempEntry,
      ...pageConfig[pageName],
      chunks: ['chunk-vendors', 'chunk-common', pageName],
      entry: resolve(`${jsFileName}.js`),
      filename: `${pageName}.html`
    };
    return result;
  }, {});
}

module.exports = { createEntries };
