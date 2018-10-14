// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './app.vue'
import Vue from 'vue'

window.apiready = function () {
  let vm = new Vue({
    el: '#app',
    render: h => h(App)
  })
  Vue.use({ vm })
}
