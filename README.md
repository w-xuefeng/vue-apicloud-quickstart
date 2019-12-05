<p align="center">
  <img width="230" src="./public/res/img/logo.png">
</p>
<h1 align="center">
  vue-apicloud-quickstart
</h1>
<div align="center">

[![Build Status](https://www.travis-ci.org/w-xuefeng/vue-apicloud-quickstart.svg?branch=master)](https://www.travis-ci.org/w-xuefeng/vue-apicloud-quickstart)

A Vue.js project in APICloud
</div>

> ## apicloud 代码文件的命名规范
>
> 文件夹命名，文件命名不能带 - 或多个. 不要有大写字符
> 
> 正确文件命名格式举例：login.js
> 
> 错误文件命名格式举例：login-test.js; login.test.js; login-test-js.js
> 
> 正确文件夹命名格式举例： loginhtml
> 
> 错误文件夹命名格式举例： login-html; login.html


# 挂载在 Vue 原型上的工具方法和属性
### 可在 Vue 实例中直接通过 this 访问

- 方法

  - $getPageMap
  - $bindKeyBackExitApp
  - $getQueryString
  - $getSafeArea
  - $getWinSize
  - $n2p
  - $headerRH
  - $tabRH
  - $pageWithHead
  - $setPullDownRefresh

- 属性

  - api
  - $api
  - $page
  - $frame
  - $pageMap
  - $isAndroid