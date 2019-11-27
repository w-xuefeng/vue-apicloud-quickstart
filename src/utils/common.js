export class APICloud {
  $isMobile = typeof api !== 'undefined';

  openWin(params) {
    console.log(typeof api);
    if (this.$isMobile) {
      window.api.openWin(params);
    } else {
      location.href = params.url;
    }
  }

  install = Vue => {
    if (this.$isMobile) {
      Vue.prototype.$api = window.api;
    }
    Vue.prototype.$isMobile = this.$isMobile;
    Vue.prototype.$openPage = this.openWin;
    Vue.mixin({
      created: function() {}
    });
  };
}

const apicloud = new APICloud();
export default apicloud;
