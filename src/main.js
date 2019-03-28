// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from './store'
import router from './router'
import FastClick from 'fastclick'
import VueScroller from 'vue-scroller'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'amfe-flexible/index.js'


Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueScroller)
Vue.use(VueAxios,axios)

FastClick.attach(document.body) //移除移动端点击延迟

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
