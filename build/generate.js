const path = require('path')
const fs = require('fs')
const glob = require('glob')
const child_process = require('child_process')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const FROME = resolve('dist')
const INDEXFILE = resolve('index.html')
const CONFIGXML = resolve('config.xml')
const TO = resolve('widget')

function getSource () {
  let source = []
  let dir = []
  glob.sync(`${FROME}/**`).forEach((pathname) => {
    if(fs.statSync( pathname ).isFile()){
      source.push({ path: pathname, name: pathname.replace(/[\S\s]*\/dist/g, '/dist') })
    } else {
      dir.push(pathname.replace(/[\S\s]*\/dist/g, '/dist'))
    }
  })
  return { source, dir }
}

function copyFile() {
  let { source, dir } = getSource()
  dir.forEach(e => fs.mkdirSync(`${TO}${e}`))
  source.forEach(e => fs.copyFileSync(e.path, `${TO}${e.name}`))
  fs.copyFileSync(CONFIGXML, `${TO}/config.xml`)
  fs.writeFileSync(`${TO}/index.html`, fs.readFileSync(INDEXFILE).toString().replace(/url:[\S\s]*\/[\W\w]*\.html/, (match) => `${match.replace(/http:\/\/[\W\w]*:\d+\//, '/dist/')}`))
}

function generate() {
  if(fs.existsSync(TO)){
    let file = []
    glob.sync(`${TO}/**`).forEach((pathname) => {
      file.push(pathname)
    })
    for(let i = file.length - 1; i >= 0; i--){
      if(fs.statSync( file[i] ).isFile()){
        fs.unlinkSync(file[i])
      } else {
        fs.rmdirSync(file[i])
      }
    }
  }
  fs.mkdirSync(TO)
  if(!fs.existsSync(FROME)){
    child_process.exec(`npm run build`, (error, stdout) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(stdout)
      copyFile()
    });
  } else {
    copyFile()
  }
  console.log(`Generate widget complete.`)
}
generate()
