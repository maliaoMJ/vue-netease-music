/* eslint-disable quotes */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import fastclick from 'fastclick'
// 字体图标库
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import "./common/stylus/index.styl"
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.component('icon', Icon)
fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App, Icon }
})