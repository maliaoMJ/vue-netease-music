import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import RecommendMusic from '@/components/recommendMusic/recommendMusic'
import RecommendVideo from '@/components/RecommendVideo/recommendVideo'
import RecommendRadio from '@/components/recommendRadio/recommendRadio'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/index',
          redirect: '/index/recommendmusic'
        },
        {
          path: '/index/recommendmusic',
          component: RecommendMusic
        },
        {
          path: '/index/recommendvideo',
          component: RecommendVideo
        },
        {
          path: '/index/recommendradio',
          component: RecommendRadio
        }
      ]
    }
  ]
})
