<div align="center">
  <img width="200" src="./assets/logo.png">
  <h1>vue-apicloud-quickstart</h1> 
  <p>使用 Vue.js + APICloud 开发移动端应用的起手式</p>

[![Github Action](https://github.com/w-xuefeng/vue-apicloud-quickstart/workflows/Node%20CI/badge.svg?branch=master)](https://github.com/w-xuefeng/vue-apicloud-quickstart)
[![Github Action](https://github.com/w-xuefeng/vaq-docs/workflows/Docs%20Deploy/badge.svg?branch=master)](https://vaq.wangxuefeng.com.cn/zh/)
[![npm](https://img.shields.io/npm/v/vue-apicloud-quickstart?style=flat)](https://www.npmjs.com/package/vue-apicloud-quickstart)
[![npm](https://img.shields.io/npm/dt/vue-apicloud-quickstart?style=flat)](https://www.npmjs.com/package/vue-apicloud-quickstart)


</div>


[English](./README.md) | 简体中文

## [查看文档](https://vaq.wangxuefeng.com.cn/zh/)

## 使用方法

- 本项目以 [w-xuefeng/vue-cli-plugin-apicloud](https://github.com/w-xuefeng/vue-cli-plugin-apicloud) 作为基础, 运行以下命令即可

  ```shell
  $ vue add @w-xuefeng/apicloud
  ```
  
  或者
    
  ``` shell
  $ npm i @w-xuefeng/vue-cli-plugin-apicloud     # 或者使用 yarn
  $ vue invoke @w-xuefeng/apicloud
  ```

## 说明

- 已支持 `Typescript`

- 在 `main.js` 中，可以配置 `plugin` 的参数，其中包括 `pages` 和 `debugOnPC`

  ```js
  import App from './App.vue'
  import Vue from 'vue'
  import VAQ from 'vue-apicloud-quickstart'
  import pages from '@/config/pages'

  Vue.config.productionTip = false

  Vue
    .use(VAQ, {
      pages,
      // debugOnPC: process.env.NODE_ENV !== 'production '
    })
    .init({
      el: '#app',
      render: h => h(App)
    })
  ```

- 1 `pages`: 页面配置

  - 在 `src` 目录下建立 `pages` 目录，和 `config` 目录，假设现有开屏广告页 
  `index/index.vue`、登录页面 `login/index.vue` 和 应用首页 `home/index.vue`， 其目录结构如下所示：

    ```
    ├── src
    |   |
    │   ├── pages                # 页面入口
    |   |   |
    |   |   ├── index
    |   |   |   |
    |   |   |   └── index.vue    # 开屏广告页
    |   |   |
    |   |   ├── login
    |   |   |   |
    |   |   |   └── index.vue    # 登录页
    |   |   |
    |   |   └── home
    |   |       |
    |   |       └── index.vue    # 应用首页
    |   |
    │   └── config               # 配置入口
    |       |
    |       └── pages.js         # 页面配置文件
    ```

  - 页面配置文件 `pages.js`， 结构如下

    ```js
    module.exports = [
      {
        title: '开屏广告页',
        name: 'index',
        path: 'index/index'
      },
      {
        title: '登录页',
        name: 'login',
        path: 'login/index'
      },
      {
        title: '应用首页',
        name: 'home',
        path: 'home/index'
      }
    ];

    ```

- 2 `debugOnPC`: PC 端调试

  - 推荐使用场景

    - 前期开发页面，调试样式时将 debugOnPC 设置为 true，可在 PC 浏览器端调试

    - 后期开发功能，调试功能时将 debugOnPC 设置为 false，在自定义Loader中调试

    - 或者也可以始终将 debugOnPC 设置为 false，在自定义Loader中调试

    - 注意：确保在编译构建的时候 debugOnPC 为 false，否则最终打包后会影响正常运行

  - 因为 APICloud 会在 APPLoader 或者 自定义 Loader 中向 `window` 上注入全局变量 `api`, 所以在移动端设备上使用 Loader 调试时可以通过 `api` 来实现调用原生模块的能力。为保证调用原生模块时都已经初始化完成，所有调用原生模块的语句都应该放在 `apiready` 的 `Hooks` 中执行。

  - 当 `debugOnPC` 为默认值即 `false` 时, Vue 页面的实例将在 `apiready` 的 `Hooks` 中执行，因此在 PC 端浏览器内无法预览调试页面。

  - 当 `debugOnPC` 为 true 时，将直接执行 new Vue() 创建页面实例，此时，所有 `api` 相关的语句无法执行，但是与 `api` 无关的页面内容将会正常显示在浏览器内。

## 参考致谢

- [vuejs/vue-cli](https://github.com/vuejs/vue-cli)
- [app-case-community/vue-cli-plugin-apicloud](https://github.com/app-case-community/vue-cli-plugin-apicloud)
  