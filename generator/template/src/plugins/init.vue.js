import Vue from 'vue';
import ReadyPlugin from './ready.plugin';
import '@/global.scss';
import * as helpFunc from './helpFunc';
import Sys from '@/config/sys';

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

export function initApiReady(window, fn) {
  window.HTMLElement.prototype.getRect = function() {
    const rect = this.getBoundingClientRect();
    const clientLeft =
      document.documentElement.clientLeft || document.body.scrollLeft;
    const clientTop =
      document.documentElement.clientTop || document.body.scrollTop;
    const top = rect.top - clientTop;
    const bottom = rect.bottom - clientTop;
    const left = rect.left - clientLeft;
    const right = rect.right - clientLeft;
    const width = rect.width || right - left;
    const height = rect.height || bottom - top;
    return {
      x: left,
      y: top,
      width: width,
      height: height,
      left: left,
      top: top,
      right: right,
      bottom: bottom
    };
  };
  Object.defineProperty(window.HTMLElement.prototype, 'computedStyle', {
    get: function() {
      return window.getComputedStyle(this);
    }
  });
  const updateOrientation = function() {
    const update = function() {
      setTimeout(function() {
        document.dispatchEvent(
          new MessageEvent('updateOrientation', {
            data: {}
          })
        );
      }, 200);
    };
    window.addEventListener('orientationchange', update, false);
  };
  window.$init = function(fn) {
    window.apiready = function() {
      if (window.api.systemType === 'ios') {
        document.addEventListener('touchstart', function() {}, false);
      }
      updateOrientation();
      fn && fn();
      document.dispatchEvent(
        new MessageEvent('apiready', {
          data: {}
        })
      );
    };
  };
  return window.$init(fn);
}

const createInstance = (App, opts = {}) => {
  return new Vue({
    ...opts,
    render: h => h(App)
  }).$mount('#app');
};

const initApp = (App, opts = {}) => {
  if (Sys.debugOnPc) {
    createInstance(App, opts);
  } else {
    initApiReady(window, () => {
      createInstance(App, opts);
    });
  }
};

export default initApp;
