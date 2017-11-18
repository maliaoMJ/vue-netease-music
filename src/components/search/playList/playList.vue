<template>
  <div class="playLists">
    <scroll :data="playListsData" class="scrollComponents" ref="scroll" >
      <div>
        <div class="no_data" v-show="playListsData.length===0">
          暂无查询数据
        </div>
        <div class="items needsclick" v-for="item in playListsData">

          <div class="imgBox">
            <img v-lazy="item.coverImgUrl" alt="">
          </div>

          <div class="playListInfo">
            <p class="playListName">{{item.name}}</p>
            <p class="playListAuthor">{{item.creator.nickname}}&nbsp;&nbsp;播放:{{item.playCount}}&nbsp;&nbsp;订阅:{{item.bookCount}}</p>
          </div>
          <router-link :to="'/playlists/'+item.id">
          <div class="iconleft">
            <icon name="angle-right" class="icon"></icon>
          </div>
          </router-link>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import scroll from '../../../base/scroll/scroll.vue'
  export default {
    name: 'playlist',
    components: {
      scroll
    },
    data () {
      return {
        playListsData: []
      }
    },
    methods: {
      _getSongs(keywords) {
        this.$http.get('http://114.67.151.28:3000/search?type=1000&limit=80&keywords=' + keywords)
          .then(response => {
            if (response.data.result.playlists !== undefined) {
              this.playListsData = response.data.result.playlists
            }
          })
          .catch(error => {
            console.log('搜索歌单失败' + error)
          })
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (this.$route.query.type) {
          this._getSongs(this.$route.query.type)
        } else {
          this._getSongs('Hello Doctor')
        }
      })
    },
    watch: {
      '$route' () {
        if (this.$route.path === '/search/playlist') {
          this._getSongs(this.$route.query.type)
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable.styl"
  .playLists
    width:100%;
    height:100%;
    background: #fcfcfc;
    overflow :hidden;
    .scrollComponents
      width:100%;
      height:100%;
      overflow hidden;
      .no_data
        width:100%;
        height:80px;
        text-align center;
        color: #8f8f8f;
        padding-top :30px;
      .items
        display: flex;
        width:100%;
        padding-left :1%;
        height:44px;
        border-bottom:1px solid #d6d6d6;
        background:white;
        box-sizing :border-box;
        .imgBox
          width:50px;
          height:40px;
          img
            width:40px;
            height:40px;
        .playListInfo
          flex:1;
          text-overflow ellipsis;
          white-space nowrap;
          overflow: hidden;
          .playListName
            padding-top :5px;
            font-size :16px;
            color: $color-font-title;
            text-overflow ellipsis;
            white-space nowrap;
            overflow: hidden;
            padding-bottom :7px;
          .playListAuthor
            font-size :12px;
            color:gray;
            text-overflow ellipsis;
            white-space nowrap;
            overflow: hidden;
        .iconleft
          width:44px;
          height:44px;
          text-align center;
          line-height 44px;
          .icon
            color:gray;
</style>
