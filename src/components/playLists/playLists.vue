<template>
  <div class="play_list">
   <title-header title='歌单'></title-header>
   <div class="play_list_box">
    <scroll class="scrollBox" :data="songsData">
      <div>
        <div class="wrapper_img">
          <img class="img_background" :src="authorInfo.backgroundUrl?createInfo.creator.backgroundUrl:''" alt="">
          <div class="play_list_lv">
            <div class="info_box">
              <div class="top">
                <div class="img_box">
                  <img v-lazy="createInfo.coverImgUrl" alt="">
                </div>
                <div class="info_text">
                  <div class="title">
                    {{createInfo.name}}
                  </div>
                  <div class="user_img">
                    <img v-lazy="authorInfo.avatarUrl" alt="">
                    <span class="user_name">{{authorInfo.nickname}}</span>
                    <icon name="angle-right" class="icon_right"></icon>
                  </div>
                </div>
              </div>
              <div class="bottom">
                <div class="item_menu">
                  <icon name="play-circle-o" class="item_icon"></icon>
                  <span class="text">{{createInfo.playCount}}</span>
                </div>
                <div class="item_menu">
                  <icon name="heartbeat" class="item_icon"></icon>
                  <span class="text">{{createInfo.trackCount}}</span>
                </div>
                <div class="item_menu">
                  <icon name="comments-o" class="item_icon"></icon>
                  <span class="text">{{createInfo.commentCount}}</span>
                </div>
                <div class="item_menu">
                  <icon name="share-alt" class="item_icon"></icon>
                  <span class="text">{{createInfo.shareCount}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-for="(item,index) in songsData" class="paly_list_item needsclick needclick"  @click="chooseSong(index)" >
         <music-public-list >
           <span slot="name">{{item.name}}</span>
           <span slot="sub">{{item.ar[0].name}}/{{item.name}}</span>
         </music-public-list>
        </div>
      </div>
    </scroll>
   </div>
  </div>
</template>

<script>
import titleHeader from '../header/titleHeader.vue'
import scroll from '../../base/scroll/scroll.vue'
import musicPublicList from '../../components/musicList/musicPublicList.vue'
export default {
  name: 'playLists',
  components: {
    titleHeader,
    scroll,
    musicPublicList
  },
  data () {
    return {
      data: [],
      createInfo: {},
      songsData: [],
      authorInfo: {},
      once: true
    }
  },
  methods: {
    _getData(id) {
      this.$http.get('http://114.67.151.28:3000/playlist/detail?id=' + id)
        .then(response => {
          this.createInfo = response.data.playlist
          this.songsData = response.data.playlist.tracks
          this.authorInfo = response.data.playlist.creator
        })
        .catch(error => {
          console.log('获取歌单数据出错' + error)
        })
    },
    chooseSong(index) {
      this.$store.commit('setPlayCurrentMusic', index)
      if (this.once) {
        var tempSongsData = this.formatSongsData(this.songsData)
        this.$store.commit('setPlayList', tempSongsData)
        this.$store.commit('setPlayState', true)
        this.once = false
      }
    }
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this._getData(this.$route.params.id)
    })
  },
  watch: {
    '$route' () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" >
  @import "../../common/stylus/variable.styl"
  .play_list
   display :flex;
   flex-direction column;
   width:100%;
   height:100%;
   .play_list_box
    flex:1;
    overflow hidden;
    padding-bottom 50px;
    .scrollBox
     width:100%;
     height:100%;
     overflow :hidden;
    .wrapper_img
     width:100%;
     height:240px;
     overflow :hidden;
     position:relative;
     .img_background
       width:100%;
       height:100%;
       filter:blur(10px);
       position:absolute;
       top:0x;
       left:0px;
     .play_list_lv
       width:100%;
       height:100%;
       background:rgba(0,0,0,0.75);
       position :absolute;
       top:0px;
       left:0px;
       .info_box
        width:92%;
        height:100%;
        margin-left :4%;
        padding-top :10px;
        .top
         height:150px;
         width:100%;
         margin-top :10px;
         display :flex;
         flex-direction:row;
         .img_box
          width:160px;
          height:150px;
          img
           width:150px;
           height:150px;
         .info_text
           flex:1;
           .title
            height:75px;
            width:100%;
            padding-top :10px;
            font-size :25px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow :hidden;
            margin-bottom:10px;
           .user_img
            height:40px;
            width:100%;
            padding-top :10px;
            img
             width:30px;
             height:30px;
             border-radius :15px;
             vertical-align :middle;
           .user_name
            padding-left 0px;
            text-overflow ellipsis;
            overflow :hidden;
            white-space:nowrap;
            display inline-block;
            max-width:90px;
           .icon_right
            transform scale(1.5);
            display inline-block;
            width:15px;
            height:15px;
        .bottom
         height:50px;
         width:100%;

         display flex;
         .item_menu
          flex:1;
          align-items center;
          margin-top:15px;
          .item_icon
            display block;
            height:24px;
            width:24px;
            margin: 0 auto;
          .text
            display block;
            width:100%;
            height:10px;
            padding-top 5px;
            text-align center;

    .paly_list_item
     width:100%;

</style>
