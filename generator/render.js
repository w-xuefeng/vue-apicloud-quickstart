const fs = require('fs');
module.exports = api => {
  api.extendPackage({
    scripts: {
      "generate": "vue-cli-service generate"
    },
    devDependencies: {
      "compressing": "^1.4.0",
      "glob": "^7.1.1",
      "js-base64": "^2.5.1"
    }
  })
  if (fs.existsSync(api.resolve('src/App.vue'))) {
    fs.renameSync(api.resolve('src/App.vue'), api.resolve('src/app.vue'));
  }
  api.render('./template', { title: '<%= htmlWebpackPlugin.options.title %>' });
}