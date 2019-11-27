(function(window) {
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
})(window);
