<template>
    <div class="musicList" >
        <div class="item_music needsclick needclick"  v-for="(item,index) in data" @click="chooseMusic(index)">
            <div class="text_music">
                <p class="title">{{item.name}}</p>
                <p class="sub">{{item.song.artists[0].name}}-{{item.name}}</p>
            </div>
            <div class="icon">
                <icon class="play_icon" name="play-circle-o"></icon>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'musicList',
      props: {
        data: {
          type: Array,
          default: []
        }
      },
      data() {
        return {
          once: true
        }
      },
      methods: {
        chooseMusic(index) {
          this.$store.commit('setPlayCurrentMusic', index)
          if (this.once) {
            var tempSongsData = this.formatSongsDataIndex(this.data)
            this.$store.commit('setPlayList', tempSongsData)
            this.$store.commit('setPlayState', true)
            this.once = false
          }
        }
      },
      mounted() {
        console.log(this.data)
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
 @import "../../common/stylus/variable.styl"
  .musicList
   height:auto;
   width:100%;
   position:relative;
   .item_music
    display :flex;
    width:100%;
    height:56px;
    position:relative;
    border-bottom :1px solid $color-border-1px;
    .text_music
      flex:1;
      padding-left :15px;
      padding-top :9px;
      text-overflow ellipsis;
      overflow hidden;
      white-space nowrap;
     .title
      font-size :16px;
      color:black;
      text-overflow ellipsis;
      overflow hidden;
      white-space nowrap;
     .sub
      padding-top :9px;
      font-size :10px;
      color:$color-font-sub;
      text-overflow ellipsis;
      overflow hidden;
      white-space nowrap;
    .icon
     width:40px;
     height:54px;
    .play_icon
     display :block;
     margin:0 auto;
     margin-top 18px;
     width:22px;
     height:22px;
     font-size 22px;
     color: #b0b0b0;




</style>
