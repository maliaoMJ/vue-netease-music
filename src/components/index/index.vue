<template>
    <div class="index">
       <div class="index-header">
         <div class="menu-title"><router-link class="links" to="/index/recommendmusic"><span class="text active">音乐</span></router-link></div>
         <div class="menu-title"><router-link class="links" to="/index/recommendvideo"><span class="text">视频</span></router-link></div>
         <div class="menu-title"><router-link class="links" to="/index/recommendRadio"><span class="text ">电台</span></router-link></div>
       </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
</template>

<script>
    export default {
      name: 'index',
      data() {
        return {
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
 .index
  .index-header
   width:100%;
   height:40px;
   background rgb(254,255,255);
   display flex;
   .menu-title
    flex:1;
    height:100%;
    .links
      display block;
      box-sizing border-box;
      width:60%;
      height:100%;
      margin-left 20%;
      color:$color-font-title;
      &.router-link-active
        border-bottom:4px solid $color-header;
        color:$color-header;
      .text
        text-align center;
        line-height 40px;
        display block;
        width:100%;
        height:100%;
        cursor:pointer;

</style>
