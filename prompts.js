module.exports = [
  {
    name: 'id',
    type: 'input',
    message: '请输入项目 ID (Please enter the app id of your project)',
    default: 'A6000000000001'
  },
  {
    name: 'name',
    type: 'input',
    message: '请输入项目名称 (Please enter the app name of your project)',
    default: 'vue-apicloud-template'
  },
  {
    name: 'description',
    type: 'input',
    message: '请输入项目描述 (Please enter the description of your project)',
    default: 'A Vue.js APP with APICloud'
  },
  {
    name: 'author',
    type: 'input',
    message: '请输入项目作者 (Please enter the author of your project)',
    default: '@w-xuefeng/vue-cli-plugin-apicloud'
  },
  {
    name: 'port',
    type: 'input',
    message: '请输入运行项目的端口号，默认 8080 (Please enter the port number of the running project, the default is 8080)',
    default: 8080
  }
]