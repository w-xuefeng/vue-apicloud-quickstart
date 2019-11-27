import App from './app';
import Vue from 'vue';
import apicloud from '@/utils/common';

Vue.use(apicloud);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
