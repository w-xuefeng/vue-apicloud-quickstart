import HelpFunc from '../utils';
import { PluginObject, PluginFunction } from 'vue';
import { InstallOptions } from '../models';

const install: PluginFunction<InstallOptions> = (Vue: Vue.VueConstructor, options?: InstallOptions) => {
  if (options) {
    const helpFuncs = HelpFunc(options);
      Object.keys(helpFuncs).forEach(funcName => {
      Object.defineProperty(Vue.prototype, `$${funcName}`, {
        get() {
          return helpFuncs[funcName];
        }
      });
    });
  }
  Object.defineProperty(Vue.prototype, 'api', {
    get: function () {
      return api;
    }
  });
  Object.defineProperty(Vue.prototype, '$api', {
    get: function () {
      return $api;
    }
  });

  Object.defineProperty(window.HTMLElement.prototype, 'getRect', {
    get() {
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
    }
  });
  Object.defineProperty(window.HTMLElement.prototype, 'computedStyle', {
    get: function () {
      return window.getComputedStyle(this);
    }
  });
};

const HelpPlugin: PluginObject<InstallOptions> = {
  install
};

export default HelpPlugin;
