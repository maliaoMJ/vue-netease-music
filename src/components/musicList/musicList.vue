<template>
    <div class="musicList" >
        <div class="item" v-for="item in data">
            <div class="text">
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
      mounted() {
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
   .item
    display :flex;
    width:100%;
    height:56px;
    position:relative;
    border-bottom :1px solid $color-border-1px;
    .text
     flex:1;
     padding-left :15px;
     padding-top :9px;
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
