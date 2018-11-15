const path = require('path')
const utils = require('./utils')
const config = require('../config')
const glob = require('glob')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function getPages () {
  let vues = []
  glob.sync(resolve('src/pages/**/*.vue')).forEach((pathname) => {
    vues.push(pathname.replace(/[\w|\W|\s|\S]*\/src\/pages\/|\.\w*$/g, ''))
  })
  return vues
}

function createEntries () {
  const jsTempPath = 'node_modules/.temp'
  const pages = getPages()
  const tempLateJsContent = fs.readFileSync(resolve('src/main.js')).toString()
  const tempLateHtmlContent = fs.readFileSync(resolve('index.html')).toString()
  if (!fs.existsSync(resolve(jsTempPath))) {
    fs.mkdirSync(resolve(jsTempPath))
  }
  fs.writeFileSync(resolve(`${jsTempPath}/index.html`), tempLateHtmlContent.replace(/<script\sid="apiIndex">[\s\S]*<\/script>/, ''))
  return pages.reduce((result, page) => {
    const jsFileName = `${jsTempPath}/${page.replace(/\/(\w)/, (match, $1) => $1.toLocaleLowerCase())}`
    fs.writeFileSync(`${jsFileName}.js`, tempLateJsContent.replace(/'(.*?)'/, `'@/pages/${page}'`))
    result[page] = resolve(`${jsFileName}.js`)
    return result
  }, {})
}
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

let configBase = {
  context: path.resolve(__dirname, '../'),
  entry: createEntries(),
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('[name].js'),
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

function getHtmls () {
  const pages = getPages()
  const chunks = [...pages]
  pages.forEach((pathname) => {
    let fileBasename = pathname.replace(/\/(\w)/, (match, $1) => $1.toLocaleLowerCase())
    let conf = {
      filename: `${fileBasename}.html`, // 生成的html存放路径，相对于path
      template: resolve('node_modules/.temp/index.html') // html模板路径
    }
    let chunk = pathname
    if (chunks.indexOf(chunk) > -1) {
      conf.inject = 'body'
      conf.chunks = ['common', chunk]
    }
    if (process.env.NODE_ENV === 'production') {
      conf.hash = true
      conf.minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    }
    configBase.plugins.push(new HtmlWebpackPlugin(conf))
  })
}
getHtmls()

module.exports = configBase
