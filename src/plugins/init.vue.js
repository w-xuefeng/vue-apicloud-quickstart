import Vue from 'vue';
import ReadyPlugin from './ready.plugin';
import '@/global.scss';
import * as helpFunc from './helpFunc';

Vue.config.productionTip = false;

Vue.use(ReadyPlugin);

Object.defineProperty(Vue.prototype, 'api', {
  get: function() {
    return window.api;
  }
});

Object.defineProperty(Vue.prototype, '$api', {
  get: function() {
    return window.$api;
  }
});

Object.keys(helpFunc).forEach(funcName => {
  Vue.prototype[`$${funcName}`] = helpFunc[funcName];
});

const initApp = (App, opts = {}) => {
  window.$init();
  return new Vue({
    ...opts,
    render: h => h(App)
  }).$mount('#app');
};

export default initApp;
