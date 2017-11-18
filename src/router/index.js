import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import RecommendMusic from '@/components/recommendMusic/recommendMusic'
import RecommendVideo from '@/components/RecommendVideo/recommendVideo'
import RecommendRadio from '@/components/recommendRadio/recommendRadio'
import RankList from '@/components/rankList/rankList'
import PlayMv from '@/components/playMv/playMv'
import Search from '@/components/search/search'
import Songs from '@/components/search/songs/songs'
import Albums from '@/components/search/albums/albums'
import Radio from '@/components/search/radio/radio'
import Mvs from '@/components/search/mvs/mvs'
import Lyrics from '@/components/search/lyrics/lyrics'
import PlayList from '@/components/search/playList/playList'
import Users from '@/components/search/users/users'
import Singers from '@/components/search/singers/singers'
import PlayLists from '@/components/playLists/playLists.vue'
import SingerDetail from '@/components/singers/singers'
import User from '@/components/user/user'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/user/:uid',
      component: User
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
    },
    {
      path: '/ranklist/:type',
      component: RankList
    },
    {
      path: '/playlists/:id',
      component: PlayLists
    },
    {
      path: '/play/mv/:id',
      component: PlayMv
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: '/search',
          redirect: '/search/songs'
        },
        {
          path: '/search/songs',
          component: Songs
        },
        {
          path: '/search/radio',
          component: Radio
        },
        {
          path: '/search/playlist',
          component: PlayList
        },
        {
          path: '/search/singers',
          component: Singers
        },
        {
          path: '/search/users',
          component: Users
        },
        {
          path: '/search/mvs',
          component: Mvs
        },
        {
          path: '/search/lyrics',
          component: Lyrics
        },
        {
          path: '/search/albums',
          component: Albums
        }

      ]
    },
    {
      path: '/singers/:id',
      component: SingerDetail
    }
  ]
})
