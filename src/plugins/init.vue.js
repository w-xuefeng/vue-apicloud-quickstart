import Vue from 'vue';
import ReadyPlugin from './ready.plugin';
const pages = require('@/config/page');

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

function getPageMap() {
  return pages.reduce((rst, page) => {
    rst[page.name] = {
      ...page,
      htmlPath: page.path.replace(/\/(\w)/, (match, $1) =>
        $1.toLocaleLowerCase()
      )
    };
    return rst;
  }, {});
}

Vue.prototype.$pageMap = {
  pages: getPageMap()
};

Vue.prototype.$n2p = function(name) {
  if (getPageMap()[name]) {
    return getPageMap()[name].htmlPath;
  } else {
    return undefined;
  }
};

function bindKeyBackExitApp() {
  if (typeof api !== 'undefined') {
    window.api.addEventListener(
      {
        name: 'keyback'
      },
      function() {
        window.api.toast({
          msg: '再按一次返回键退出' + window.api.appName,
          duration: 2000,
          location: 'bottom'
        });
        window.api.addEventListener(
          {
            name: 'keyback'
          },
          function() {
            window.api.closeWidget({ silent: true });
          }
        );
        setTimeout(() => {
          bindKeyBackExitApp();
        }, 3000);
      }
    );
  }
}

Vue.prototype.$bindKeyBackExitApp = bindKeyBackExitApp;

var _openw = null;
Vue.prototype.$page = {
  open(url, { pageParam, animation, winOpts } = {}) {
    console.log('s', _openw);
    if (_openw) {
      return;
    }
    url = url.endsWith('.html') ? url : url + '.html';
    var api = window.api;
    if (!api) {
      window.location.href = url;
      return;
    }
    var name = `win_${url}`;
    var params = {
      name,
      url,
      pageParam,
      animation,
      ...(winOpts || {})
    };
    api.openWin(params);
    console.log('e', _openw);
  },
  close() {
    if (!window.api) {
      window.history.back();
      return;
    }
    window.api.closeWin();
  },
  closeToWin({ url, animation }) {
    url = url.endsWith('.html') ? url : url + '.html';
    if (typeof api !== 'undefined') {
      const name = `win_${url}`;
      if (animation) {
        api.closeToWin({ name, animation });
      } else {
        api.closeToWin({ name });
      }
    } else {
      window.location.href = url;
    }
  }
};

Vue.prototype.$frame = {
  open(params) {
    let { url } = params;
    url = url.endsWith('.html') ? url : url + '.html';
    if (typeof api !== 'undefined') {
      api.openFrame({ ...params, url });
    } else {
      const { name, rect } = params;
      const iframe = document.createElement('iframe');
      iframe.setAttribute('frameborder', 0);
      iframe.setAttribute('name', name);
      iframe.src = url;
      iframe.style.position = 'absolute';
      if (rect.x) {
        iframe.style.left = `${rect.x}px`;
      }
      if (rect.y) {
        iframe.style.top = `${rect.y}px`;
      }
      if (rect.w) {
        iframe.style.width = rect.w === 'auto' ? '100%' : `${rect.w}px`;
      }
      if (rect.h) {
        iframe.style.height = rect.h === 'auto' ? '100%' : `${rect.h}px`;
      }
      document.body.appendChild(iframe);
    }
  }
};

const initApp = (App, opts = {}) => {
  new Vue({
    ...opts,
    render: h => h(App)
  }).$mount('#app');
};
export default initApp;
