const install = Vue => {
  if (install.installed) return;
  install.installed = true;
  initApiReady(window);
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
                window.api.addEventListener({ name: key }, (ret, err) => {
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

function initApiReady(window) {
  window.HTMLElement.prototype.getRect = function() {
    var rect = this.getBoundingClientRect();
    var clientLeft =
      document.documentElement.clientLeft || document.body.scrollLeft;
    var clientTop =
      document.documentElement.clientTop || document.body.scrollTop;
    var top = rect.top - clientTop;
    var bottom = rect.bottom - clientTop;
    var left = rect.left - clientLeft;
    var right = rect.right - clientLeft;
    var width = rect.width || right - left;
    var height = rect.height || bottom - top;
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
  var updateOrientation = function() {
    var update = function() {
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
      document.dispatchEvent(
        new MessageEvent('apiready', {
          data: {}
        })
      );
      fn && fn();
    };
  };
}

export default {
  install
};
