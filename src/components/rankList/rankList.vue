<template>
  <transition name="fade">
    <div class="rankList">
      <div  class="header">
        <div class="icon_left needsclick" @click="goback"><icon class="icon needsclick" name="angle-left"></icon></div>
        <div class="text">{{ranklist.name}}</div>
      </div>
      <div class="rankBox">
        <scroll  ref="scroll" class="scrollComponents" :data="ranklistItems" >
          <div>
            <img v-lazy="ranklist.coverImgUrl" alt="" >
            <div class="Item needsclick" v-show="ranklistItems" v-for="(item,index) in ranklistItems" @click="chooseMusic(index)">
              <div class="index"  v-lazy:background-image=item.album.picUrl><div class="number">{{index+1}}</div></div>
              <div class="text">{{item.name}}-{{item.artists[0].name}}</div>
              <div class="icon_right needsclick"><icon class="icon needsclick" name="play-circle-o"></icon></div>
            </div>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
    import musicList from '../../components/musicList/musicList.vue'
    import scroll from '../../base/scroll/scroll.vue'
    export default {
      name: 'rankList',
      components: {
        scroll,
        musicList
      },
      data() {
        return {
          ranklist: [],
          ranklistItems: [],
          once: true
        }
      },
      computed: {
        type () {
          return this.$route.params.type
        }
      },
      methods: {
        goback() {
          this.$router.go(-1)
        },
        _getRankList(type) {
          this.$http.get('http://114.67.151.28:3000/top/list?idx=' + type)
            .then(response => {
              this.ranklist = response.data.result
              this.ranklistItems = this.ranklist.tracks
            })
            .catch(error => {
              console.log('获取ranklist数据失败' + error)
            })
        },
        chooseMusic(index) {
          this.$store.commit('setPlayCurrentMusic', index)
          if (this.once) {
            var tempSongsData = this.formatSongsDataRank(this.ranklistItems)
            this.$store.commit('setPlayList', tempSongsData)
            this.$store.commit('setPlayState', true)
            this.once = false
          }
        }
      },
      mounted() {
        this.$nextTick(() => {
          this._getRankList(this.$route.params.type)
        })
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
  .rankList
   display block;
   position:absolute;
   left:0;
   top:0;
   width:100%;
   height:92%;
   background :white;
   .header
     display: flex;
     width:100%;
     height:40px;
     background:$color-header;
     .icon_left
       width:30px;
       text-align :center;
       height:40px;
       .icon
        margin-top 10px;
        transform scale(2)
     .text
       flex 1;
       font-size 16px;
       line-height :37px;
       text-overflow ellipsis;
       overflow hidden;
       white-space nowrap;
   .rankBox
      flex:1;
      position:absolute;
      height:94%;
      top:40px;
      left:0;
      width:100%;
      .scrollComponents
        height:100%;
        overflow hidden;
        img
         width:100%;
         height :250px;
        .Item
          width:100%;
          border-bottom 1px solid $color-border-1px
          position:relative;
          height:40px;
          display flex;
          .index
            width: 40px;
            backgrond: red;
            height: 40px;
            text-align: center;
            line-height: 40px;
            color:white;
            background-size 100% 100%;
            .number
             width:100%;
             height:100%;
             background:rgba(0,0,0,0.5);
             text-align: center;
             line-height: 40px;
             color:white;
          .text
            flex: 1;
            text-align: left;
            line-height: 40px;
            padding-left :10px;
            color:$color-font-title;
            text-overflow ellipsis;
            overflow hidden;
            white-space nowrap;
          .icon_right
            width:30px;
            height:40px;
            line-height :40px;
            text-align :center;
            .icon
              transform :scale(1.3);
              color: #959595;
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>
