import FastClick from 'fastclick';
import { PluginObject } from 'vue';
import { InstallOptions } from '../models';

const install = (Vue: Vue.VueConstructor, options: InstallOptions) => {  
  const { debugOnPC } = options;
  const updateOrientation = () => {
    const update = function () {
      setTimeout(function () {
        document.dispatchEvent(
          new MessageEvent('updateOrientation', {
            data: {}
          })
        );
      }, 200);
    };
    window.addEventListener('orientationchange', update, false);
  };
  const init = (fn) => {
    updateOrientation();
    fn && fn();
    FastClick.attach(document.body);
    document.dispatchEvent(new MessageEvent('apiready', { data: {} }));
  };
  function initApiReady (debugOnPC, fn) {
    if (debugOnPC) {
      init(fn);
    } else {
      window.apiready = function () {
        if (api.systemType === 'ios') {
          document.addEventListener('touchstart', () => { }, false);
        }
        init(fn);
      };
    }
  }
  initApiReady(debugOnPC, () => { });
  Vue.mixin({
    beforeCreate() {
      this._isApiready = false;
      document.addEventListener('apiready', () => {
        if ('apiEvent' in this.$options) {
          const apiEvent = this.$options.apiEvent;
          for (const key in apiEvent) {
            if (apiEvent.hasOwnProperty(key)) {
              const eventListener = apiEvent[key];
              if (typeof eventListener === 'function') {
                api.addEventListener({ name: key }, (ret, err) => {
                  eventListener.bind(this).call(this, ret, err);
                });
              }
            }
          }
        }
        this._isApiready = true;
        if (this._isMounted) {
          this.__ready();
        }
      });
      document.addEventListener('updateOrientation', () => {
        this.$options.onWindowChange &&
          this.$options.onWindowChange.bind(this).call();
      });
    },
    mounted() {
      if (this._isApiready) {
        this.__ready();
      } else {
        setTimeout(() => {
          this.__ready();
        }, 200);
      }
    },
    methods: {
      __ready() {
        if (this.__readyed) {
          return;
        }
        this.__readyed = true;
        this.$options.onReady && this.$options.onReady.bind(this).call();
      }
    }
  });
};

const ReadyPlugin:  PluginObject<InstallOptions> = {
  install
};
export default ReadyPlugin;
