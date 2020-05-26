import Vue from 'vue'
import App from './App.vue'
import VAQ from 'vue-apicloud-quickstart'
import pages from '@/config/pages.json'

Vue.config.productionTip = false
Vue
  .use(VAQ, { pages, debugOnPC: process.env.NODE_ENV !== 'production' })
  .init({ el: '#app', render: (h: Function) => h(App) })
