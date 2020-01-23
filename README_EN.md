<div align="center">
  <img width="200" src="./assets/logo.png">
  <h1>vue-apicloud-quickstart</h1>
  <p> The start up of using vue.js + apicloud to develop mobile applications</p>

[![Github Action](https://github.com/w-xuefeng/vue-apicloud-quickstart/workflows/Node%20CI/badge.svg?branch=master)](https://github.com/w-xuefeng/vue-apicloud-quickstart)
[![npm](https://img.shields.io/npm/v/vue-apicloud-quickstart?style=flat)](https://www.npmjs.com/package/vue-apicloud-quickstart)
[![npm](https://img.shields.io/npm/dt/vue-apicloud-quickstart?style=flat)](https://www.npmjs.com/package/vue-apicloud-quickstart)

</div>

English | [简体中文](./README.md)

## Usage

### Use alone

- Install，run the following command

  ```shell
  $ vue add @w-xuefeng/apicloud
  ```

## Explain

- 1 Page configuration

  - Create the `pages` directory and the `config` directory under the `src` directory, assuming that there are existing open screen ad pages
`index/index.vue`, login page `login/index.vue` and application home page `home/index.vue`, the directory structure is as follows:

    ```
    ├── src
    |   |
    │   ├── pages                # Page entry
    |   |   |
    |   |   ├── index
    |   |   |   |
    |   |   |   ├── index.vue    # Open screen advertising page
    |   |   |   |
    |   |   ├── login
    |   |   |   |
    |   |   |   ├── index.vue    # Login page
    |   |   |   |
    |   |   └── home
    |   |       |
    |   |       └── index.vue    # APP home page
    |   |
    │   └── config               # Configuration entry
    |       |
    |       └── pages.js         # Page profile
    ```

  - The page configuration file `pages.js` has the following structure

    ```js
    module.exports = [
      {
        title: 'advertisingPage',
        name: 'index',
        path: 'index/index'
      },
      {
        title: 'loginPage',
        name: 'login',
        path: 'login/index'
      },
      {
        title: 'homePage',
        name: 'home',
        path: 'home/index'
      }
    ];

    ```

- 2 Debugging on PC

  - Recommended scenarios 

    - When development page and debugging the style in the early, you could set debugonpc to true, which can be debugged in the PC browser

    - When development and debugging function later, you could set debugOnPC to false, debugging in custom Loader.

    - Or you can always set debugOnPC to false and debug in custom Loader.

  - Because apicloud will inject global variables `api `into `window` in apploader or custom loader, the ability to call native modules can be realized through `api` when using loader debugging on mobile devices. To ensure that the initialization is completed when calling the native module, all statements calling the native module should be executed in hooks of `apiready`.

  - When `debugOnPC` is the default value `false`, the instance of Vue page will execute in hooks of `apiready`, so the debugging page cannot be previewed in PC browser.

  - When `debugOnPC` is true, `new vue()` will be executed directly to create a page instance. At this time, all `api` related statements cannot be executed, but the page content unrelated to `api` will be displayed in the browser normally.
  
  
## Reference & Acknowledge 

- [app-case-community/vue-cli-plugin-apicloud](https://github.com/app-case-community/vue-cli-plugin-apicloud)