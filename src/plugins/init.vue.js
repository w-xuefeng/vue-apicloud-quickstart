import Vue from 'vue';
import ReadyPlugin from './ready.plugin';

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

var _openw = null;
Vue.prototype.$page = {
  open(url, { pageParam, animation, winOpts } = {}) {
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
  },
  close() {
    if (!window.api) {
      window.history.back();
      return;
    }
    window.api.closeWin();
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
