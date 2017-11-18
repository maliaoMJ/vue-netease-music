<template>
    <div class="album_list">
     <div class="album_img_box">
       <slot name="albumimg"></slot>
     </div>
     <div class="album_info_box">
       <div class="name">
         <slot name="albumname"></slot>
       </div>
       <div class="sub">
         <slot name="albumsub"></slot>
       </div>
     </div>
    </div>
</template>

<script>
    export default {
      name: 'albumList',
      props: {
        data: {
          type: Array,
          default: []
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
 @import "../../common/stylus/variable.styl"
  .album_list
   width:100%;
   height:60px;
   border-bottom 1px solid $color-border-1px;
   display :flex;
   flex-direction row;
   box-sizing border-box;
   .album_img_box
    width:90px;
    height:60px;
    margin-right :10px;
    img
     display block;
     width:90px;
     height:90%;
     margin-top :5%;
   .album_info_box
    color:white;
    flex:1;
    height:60px;

    display flex;
    flex-direction column;
    .name
     span
       display block;
       height:26px;
       width:250px;
       font-size :16px;
       color:$color-font-title;
       padding-top 8px;
       padding-bottom :5px;
       text-overflow:ellipsis;
       overflow:hidden;
       white-space:nowrap;
    .sub
       span
        flex:1;
        color: #979797;
        text-overflow:ellipsis;
        overflow:hidden;
        white-space:nowrap;
        width:250px;
        font-size :13px;
</style>
