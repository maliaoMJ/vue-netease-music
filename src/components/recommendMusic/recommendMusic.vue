<template>
    <div class="recommendMusic">
      <scroll  ref="scroll" class="scrollComponents" :data="newMusicData">
        <div>
          <div class="banner slider-wrapper">
            <slider v-if="bannerImgs">
              <div  v-for="item in bannerImgs" >
                <a href="javascript:void(0);" class="a_click">
                  <img v-lazy="item.pic" :title="item.typeTitle" alt="" class="img_item">
                </a>
              </div>
            </slider>
          </div>
          <h3>热门推荐</h3>
          <module-title title="推荐歌单"></module-title>
          <div class="music_menu" v-if="musicMenuData">
            <div class="menu_item" v-for="item in musicMenuData">
              <router-link :to="'/playlists/'+item.id">
              <div class="playCount">
                <img v-lazy="item.picUrl" alt="" :title="item.copywriter">
                <div class="lv">
                  <icon class="icon" name="headphones"></icon>&nbsp;{{item.playCount | formatPlayCount}}&nbsp;&nbsp;
                </div>
              </div>
              <h6>{{item.name}}</h6>
              </router-link>
            </div>
          </div>
          <module-title title="最新MV"></module-title>
          <div class="music_menu" v-if="musicMenuData">
            <div class="menu_item needsclick" v-for="item in newMv">
              <router-link :to="'/play/mv/'+item.id">
              <div class="playCount">
                <img v-lazy="item.cover" alt="" :title="item.artistName">
                <div class="lv">
                  <icon class="icon" name="headphones"></icon>&nbsp;{{item.playCount}}&nbsp;&nbsp;
                </div>
              </div>
              <h6>{{item.briefDesc}}</h6>
              </router-link>
            </div>

          </div>
          <module-title title="最新音乐"></module-title>
          <music-list :data="newMusicData" v-show="newMusicData"></music-list>
        </div>
      </scroll>
    </div>
</template>

<script>
  import Slider from '../../base/slider/vueSlider.vue'
  import Scroll from '../../base/scroll/scroll.vue'
  import moduleTitle from '../../components/moduleTitle/moduleTitle'
  import musicList from '../../components/musicList/musicList.vue'

  export default {
    name: 'recommendMusic',
    components: {
      Slider,
      Scroll,
      moduleTitle,
      musicList
    },
    data() {
      return {
        bannerImgs: [],
        musicMenuData: [],
        newMv: [],
        newMusicData: []
      }
    },
    computed: {
    },
    mounted() {
      this.$nextTick(() => {
        this._getBannerData()
        this._getMusicMenuData()
        this._getNewMv()
        this._getNewMusicData()
        this.$refs.scroll.refresh()
      })
    },
    methods: {
      _getBannerData () {
//        http://localhost:3000/personalized
        this.$http.get('http://114.67.151.28:3000/banner')
          .then((response) => {
            console.log(response.data.banners)
            this.bannerImgs = response.data.banners
          })
          .catch((error) => {
            console.log('获取banner数据出错' + error)
          })
      },
      _getMusicMenuData() {
        this.$http.get('http://114.67.151.28:3000/personalized')
          .then((response) => {
            this.musicMenuData = response.data.result
          })
          .catch((error) => {
            console.log('获取推荐歌单失败' + error)
          })
      },
      _getNewMv() {
        this.$http.get('http://114.67.151.28:3000/mv/first?limit=6')
          .then((response) => {
            this.newMv = response.data.data
          })
          .catch((error) => {
            console.log('获取最新MV数据失败' + error)
          })
      },
      _getNewMusicData() {
        this.$http.get('http://114.67.151.28:3000/personalized/newsong')
          .then((response) => {
            this.newMusicData = response.data.result
          })
          .catch((error) => {
            console.log('获取最新音乐列表失败' + error)
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .recommendMusic
    flex:1;
    position:absolute;
    height:82%;
    top:80px;
    left:0;
    width:100%;
    .scrollComponents
      height:100%;
      overflow hidden;
      .banner
       width:100%;
       height:140px;
       position:relative;
       overflow :hidden;
      h3
       color:$color-font-title;
       width:100%;
       text-align center;
       height:40px;
       line-height 40px;
       letter-spacing 2px;
      .music_menu
       width:96%;
       margin-left 2%;
       height:300px;
       .menu_item
        width:32%;
        height:140px;
        float:left;
        margin-right 2%;
        margin-top :10px;
        &:nth-child(3n)
          margin-right:0;
        .playCount
         width:100%;
         height:100px;
         position:relative;
         img
          position:absolute;
          left:0px;
          top:0px;
          height:100%;
          width:100%;
          z-index :100;
         .lv
          position:absolute;
          left:0px;
          top:0px;
          height:100%;
          width:100%;
          z-index :100;
          background:rgba(0,0,0,0.2);
          font-size:10px;
          text-align :right;
          color:white;
          .icon
           vertical-align bottom;
           color:white;
        h6
          width:100%;
          height:28px;
          font-size :12px;
          color:$color-font-title;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          padding-top 5px;
          line-height 14px


      .bottomline
        display block;
        padding-top 10px;
        text-align:center;
        width:100%;
        height:20px;
        z-index :1;
        color:gray;
        h6
          font-size :10px;
</style>
