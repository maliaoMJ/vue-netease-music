<template>
    <div class="singer_detail">
     <title-header :title="artist.name"></title-header>
     <div class="singer_detail_box">
       <img :src="artist.picUrl" alt="" class="topImg" ref="singer">
       <div class="singer_info_box">
             <div class="space ">

             </div>
             <div class="tab" ref="tab">
               <div :class="[type==='hot'?'active':'', 'item']" @click="_changeType('hot')">
                 热门
               </div>
               <div :class="[type==='album'?'active':'',  'item']" @click="_changeType('album')">
                 专辑
               </div>
               <div :class="[type==='mv'?'active':'',  'item']" @click="_changeType('mv')">
                 MV
               </div>
               <div :class="[type==='info'?'active':'',  'item']" @click="_changeType('info')">
                 歌手信息
               </div>
             </div>
             <div class="result_box">
               <scroll :data="hotData" class="singer_scroll" ref="result" @scroll="_getPositionResult" :listenScroll="true">
                 <div>
                   <div v-if="type==='hot'">
                     <div v-for="item in hotData">
                       <musicPublicList>
                         <span slot="name">{{item.name}}</span>
                         <span slot="sub">{{artist.name+'-'+item.name}}</span>
                       </musicPublicList>
                     </div>
                   </div>
                   <div v-else-if="type==='album'">
                     <div v-for="item in albumData">
                       <album-list :data="albumData">
                         <img slot="albumimg" v-lazy="item.picUrl" alt="">
                         <span slot="albumname">{{item.name}}</span>
                         <span slot="albumsub">发布时间:{{new Date(item.publishTime)}}</span>
                       </album-list>
                     </div>
                   </div>
                   <div v-else-if="type==='mv'">
                     <mv-list :data="mvData"></mv-list>
                   </div>
                   <div v-else>自己去百度。不想做。。。。</div>
                 </div>
               </scroll>
             </div>
       </div>
     </div>
    </div>
</template>

<script>
    import mvList from '../../components/mvList/mvList.vue'
    import titleHeader from '../../components/header/titleHeader.vue'
    import scroll from '../../base/scroll/scroll.vue'
    import musicPublicList from '../../components/musicList/musicPublicList.vue'
    import albumList from '../../components/ablumList/ablumList.vue'
    export default {
      name: 'singerDetail',
      components: {
        titleHeader,
        scroll,
        musicPublicList,
        mvList,
        albumList
      },
      data() {
        return {
          data: [],
          type: 'hot',
          artist: {},
          hotData: [],
          albumData: [],
          mvData: [],
          infoData: []
        }
      },
      methods: {
        _changeType(type) {
          this.type = type
          this.$nextTick(() => {
            this.$refs.result.refresh()
            this.$refs.result.scrollTo(0, 0)
          })
        },
        _getHotData(id) {
          this.$http.get('http://114.67.151.28:3000/artists?id=' + id)
            .then(response => {
              this.artist = response.data.artist
              this.hotData = response.data.hotSongs
            })
            .catch(error => {
              console.log('获取歌手对应热门歌曲失败' + error)
            })
        },
        _getAlbums(id) {
          this.$http.get('http://114.67.151.28:3000/artist/album?id=' + id + '&limit=30')
            .then(response => {
              this.albumData = response.data.hotAlbums
            })
            .catch(error => {
              console.log('获取歌手对应热门专辑失败' + error)
            })
        },
        _getMvs(id) {
          this.$http.get('http://114.67.151.28:3000/artist/mv?id=' + id)
            .then(response => {
              this.mvData = response.data.mvs
            })
            .catch(error => {
              console.log('获取歌手对应热门mv失败' + error)
            })
        },
        _getInfo(id) {
          this.$http.get('http://114.67.151.28:3000/artist/mv?id=' + id)
            .then(response => {
              this.infoData = response.data.introduction
            })
            .catch(error => {
              console.log('获取歌手对应信息失败' + error)
            })
        },
        _getPositionResult(position) {
          if (position.y > 0) {
          }
        }
      },
      mounted() {
        this.$nextTick(() => {
          this._getHotData(this.$route.params.id)
          this._getMvs(this.$route.params.id)
          this._getAlbums(this.$route.params.id)
          this.$refs.result.refresh()
        })
      },
      watch: {
        '$route' () {
          console.log(this.$route.params.id)
          this._getHotData(this.$route.params.id)
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
 @import "../../common/stylus/variable.styl"
  .singer_detail
    width:100%;
    height:100%;
    position:relative;
    display: flex;
    flex-direction column;
    .singer_detail_box
     flex:1;
     position:relative;
     .topImg
       width:100%;
       height:270px;
       position:absolute;
       top:0px;
       left:0px;
     .singer_info_box
       flex:1;
       flex-direction column;
       display flex;
       width:100%;
       height:100%;
       position:absolute;
       top:0px;
       left:0px;
       .space
         width:100%;
         height:270px;
         position:relative;
         top:0px;
         left:0px;
         background:rgba(0,0,0,0.0);
       .tab
         width:100%;
         height:40px;
         background: #fefefe;
         display flex;
         flex-direction row;
         .item
          flex:1;
          color:$color-font-title;
          line-height :40px;
          text-align :center;
          font-size :14px;
          &.active
           border-bottom:3px solid $color-header;
           box-sizing border-box;
       .result_box
         width:100%;
         flex :1;
         overflow hidden;
         color:red;
         background:white;
         .singer_scroll
          width:100%;
          height:100%;
          overflow hidden;

</style>
