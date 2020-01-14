const fs = require('fs');
const path = require('path');
const glob = require('glob');
const child_process = require('child_process');
const compressing = require('compressing');

function createEntries (api, pageConfig, tempEntry) {
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
      entry: api.resolve(`${tempEntry.entry}?page=${page.path}`),
      filename: `${pageName}.html`
    };
    return result;
  }, {});
}

function entriesLoader (api, config, tempEntry) {
  config.module
    .rule('entry')
    .test(api.resolve(tempEntry.entry))
    .use('entry-loader')
    .loader(path.join(__dirname, '..', 'entry/entry-loader.js'))
    .end();
}

function resolve (api, dir) {
  return api.resolve(dir);
}

function getSource (FROME) {
  let source = [];
  let dir = [];
  glob.sync(`${FROME}/**`).forEach(pathname => {
    if (fs.statSync(pathname).isFile()) {
      source.push({
        path: pathname,
        name: pathname.replace(/[\S\s]*\/dist/g, '/dist')
      });
    } else {
      dir.push(pathname.replace(/[\S\s]*\/dist/g, '/dist'));
    }
  });
  return { source, dir };
}

function copyFile ({ api, FROME, TO, OtherFiles, target, CONFIGXML, INDEXFILE, outputDir, TOZIP }) {
  let { source, dir } = getSource(FROME);
  dir.forEach(e => fs.mkdirSync(`${TO}${e}`));
  source.forEach(e => fs.copyFileSync(e.path, `${TO}${e.name}`));
  OtherFiles.forEach(e => {
    copyOtherFiles(e, target, api);
  });
  fs.copyFileSync(CONFIGXML, `${TO}/config.xml`);
  fs.renameSync(`${TO}/${outputDir}`, `${TO}/html`);
  fs.writeFileSync(
    `${TO}/index.html`,
    fs
      .readFileSync(INDEXFILE)
      .toString()
      .replace(
        /url:[\S\s]*\/[\W\w]*\.html/,
        match => `${match.replace(/http:\/\/[\W\w]*:\d+\//, 'html/')}`
      )
  );
  compressing.tgz
    .compressDir(TO, TOZIP)
    .then(() => {
      console.log(`Generate widget complete.`);
    })
    .catch(e => {
      console.error(`Compressing widget error, error info: ${e}`);
    });
}

function generate ({ api, FROME, TO, OtherFiles, target, CONFIGXML, INDEXFILE, outputDir, TOZIP, rebuild }) {
  if (fs.existsSync(TOZIP)) {
    fs.unlinkSync(TOZIP);
  }
  if (fs.existsSync(TO)) {
    let file = [];
    glob.sync(`${TO}/**`).forEach(pathname => {
      file.push(pathname);
    });
    for (let i = file.length - 1; i >= 0; i--) {
      if (fs.statSync(file[i]).isFile()) {
        fs.unlinkSync(file[i]);
      } else {
        fs.rmdirSync(file[i]);
      }
    }
  }
  fs.mkdirSync(TO);
  if (rebuild || !fs.existsSync(FROME)) {
    child_process.exec(`npm run build`, (error, stdout) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(stdout);
      copyFile({ api, FROME, TO, OtherFiles, target, CONFIGXML, INDEXFILE, outputDir, TOZIP });
    });
  } else {
    copyFile({ api, FROME, TO, OtherFiles, target, CONFIGXML, INDEXFILE, outputDir, TOZIP });
  }
}

function copyOtherFiles (from, to, api) {
  let source = [];
  let dir = [];
  glob.sync(`${resolve(api, from)}/**`).forEach(pathname => {
    if (fs.statSync(pathname).isFile()) {
      source.push({
        path: pathname,
        name: pathname.replace(
          // eslint-disable-next-line no-useless-escape
          new RegExp(`[\\S\\s]*\/${from}`, 'g'),
          `/${from}`
        )
      });
    } else {
      dir.push(
        // eslint-disable-next-line no-useless-escape
        pathname.replace(new RegExp(`[\\S\\s]*\/${from}`, 'g'), `/${from}`)
      );
    }
  });
  dir.forEach(e => fs.mkdirSync(`${resolve(api, to)}${e}`));
  source.forEach(e => fs.copyFileSync(e.path, `${resolve(api, to)}${e.name}`));
}

function getIPAdress () {
  const interfaces = require('os').networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

function getEntries (pageConfig) {
  return pageConfig.map(e => ({
    name: e.name,
    htmlpath: e.path.replace(/\/(\w)/, (match, $1) => $1.toLocaleLowerCase())
  }))
}

module.exports = {
  createEntries,
  entriesLoader,
  resolve,
  getSource,
  generate,
  getIPAdress,
  getEntries
}