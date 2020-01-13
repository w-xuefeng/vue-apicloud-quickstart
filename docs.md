# Vue-APICloud-Quickstart 文档

## 页面配置

所有页面都需要在 `src/config/page.js` 文件中声明 `title`、`name`、`path`

- `title` 作为编译后 html 文件的 title，可为空，页面所展示的 title 不在此处配置
- `name` 作为当前页面的唯一标识，不能与其他页面重复，将作为 APICloud 中 `window` 或 `frame` 的 `name`
- `path` 是页面文件相对于 `src` 目录的相对路径，不需要加文件扩展名，如 `src/login/index.vue` 的 path 为 `login/index`

如

```js
const pages = [
  {
    title: '登录',
    name: 'login',
    path: 'login/index'
  },
  ...
];

module.exports = pages
```

该配置文件 `src/config/page.js` 经过魔法处理后将作为多页面应用的入口传递给 `webpack`，在最终 `build` 时，会生成相对应的 html 文件，如 `src/login/index.vue` 最终会生成 `loginindex.html` 文件。





## 挂载在 Vue 原型上的属性
- `api` 只读属性，与 `window.api` 等同， 即 APICloud 环境提供的可以访问`原生API`的能力，在页面实例中，可直接通过 `this.api` 访问, 因此， 页面实例中不能声明以 `api` 命名的 `props`、`data`、`computed`、`methods`.

- $api 只读属性，与 `window.$api` 等同, 即 APICloud 官方封装的一些常用的方法和属性的js库
- $page
- $frame
- $pageMap
- $isAndroid


...未完待续





# header 的配置选项

属性 | 类型 | 描述 | 是否必须 | 默认值 
-|-|-|-|-
title | string | 标题 | false | '' 
back | boolean | 是否有返回图标 | false | false 
right | boolean | 是否展示右侧图标 | false | false 
left | boolean | 是否展示左侧图标 | false | false 
search | object | 搜索栏设置, 具体配置见 [search](#search) | false | { enabled: false } 
headStyle | object | 头部样式 | false | false 
rightIcon | string 或 array | 右侧展示的图标，具体配置见 [IconConfig](#IconConfig) | false | null
leftIcon | string 或 array | 右侧展示的图标，具体配置见 [IconConfig](#IconConfig) | false | null
rightIconColor | string | 右侧图标颜色 | false | '#ffffff' 
leftIconColor | string | 左侧图标颜色 | false | '#ffffff' 
customComponet | string | 左侧自定义组件名 | false | - 
customComponetOpts | object | 左侧自定义组件参数配置 | false | - 
shadow | boolean | 头部组件底部是否有阴影 | false | false 
framePathName | string | 当前页面入口名称 | true | - 
winOpts | object | 内容页面传递参数，具体配置见 [winOpts](#winOpts)  | false | - 



<h1 id="search">search</h1>

属性 | 类型 | 描述 | 是否必须 | 默认值 
-|-|-|-|-
enabled | boolean | 是否显示搜索栏 | false | false
style | object | 搜索栏容器样式 | false | -
innerStyle | object | 搜索栏样式 | false | -
shape | string | 搜索栏样式类型 | false | 'round'
placeholder | string | 搜索栏占位符 | false | -
background | string | 搜索栏背景色 | false | 'transparent'
disabled | boolean | 禁用搜索栏 | false | false
iconStyle | object | 搜索栏左侧图标的样式 | false | -

<h1 id="IconConfig">IconConfig</h1>

- 如果只有一个图标，则如下直接写 icon 的 name 字符串
- 如果需要多个图标，需写成数组的形式，数组内成员为一个对象，具体如下

属性 | 类型 | 描述 | 是否必须 | 默认值 
-|-|-|-|-
icon | string | icon 的 name | true | -
color | string | icon 的 颜色 | false | '#ffffff'


<h1 id="winOpts">winOpts</h1>

属性 | 类型 | 描述 | 是否必须 | 默认值 
-|-|-|-|-
pageParam | any | 页面需要传递的参数 | false | -

