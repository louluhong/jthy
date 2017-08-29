// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import store from 'store'
import App from './App'
import router from './router/route-config.js'
import Mint from 'mint-ui';
import zepto from 'webpack-zepto'
import fastclick from 'fastclick'
import 'mint-ui/lib/style.css';

import './assets/js/flexible.js';

Vue.use(Vuex)
Vue.use(Mint);
Vue.config.productionTip = false
fastclick.attach(document.body)

window.$ = zepto

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
