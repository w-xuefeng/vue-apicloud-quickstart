import App from './index';
import Vue from 'vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
