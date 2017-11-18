<template>
  <div class="musicPublicList" >
    <div class="item_music">
      <div class="text_music">
        <p class="title"><slot name="name"></slot></p>
        <p class="sub"><slot name="sub"></slot></p>
      </div>
      <div class="icon">
        <icon class="play_icon" name="play-circle-o"></icon>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'musicPublicList',
    mounted() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .musicPublicList
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
