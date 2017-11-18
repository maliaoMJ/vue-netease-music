/* eslint-disable quotes */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import {store} from './store/store'
import fastclick from 'fastclick'
// 字体图标库
import 'vue-awesome/icons'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
import Icon from 'vue-awesome/components/Icon'
import {formatSongsData, formatSongsDataIndex, formatSongsDataRank, formatSongsDataWeekData, formatSongsDataSearch} from "./util/formatData"
import {formatDate, formatPlayCount} from './filter/filter'
import "./common/stylus/index.styl"
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.filter('formatDate', formatDate)
Vue.filter('formatPlayCount', formatPlayCount)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://wanzao2.b0.upaiyun.com/14758515678631475754541_400x400.gif-460.gif',
  loading: 'http://wanzao2.b0.upaiyun.com/14758515678631475754541_400x400.gif-460.gif',
  attempt: 1
})
Vue.component('icon', Icon)
fastclick.attach(document.body)
Vue.prototype.formatSongsData = formatSongsData
Vue.prototype.formatSongsDataIndex = formatSongsDataIndex
Vue.prototype.formatSongsDataRank = formatSongsDataRank
Vue.prototype.formatSongsDataWeekData = formatSongsDataWeekData
Vue.prototype.formatSongsDataSearch = formatSongsDataSearch
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App, Icon },
  methods: {
  }
})
