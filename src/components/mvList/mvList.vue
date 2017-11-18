<template>
    <div class="mvList">

      <div class="item needsclick" v-for="item in data">
        <router-link :to="'/play/mv/'+item.id">
        <div class="imgBox">
          <img v-lazy="item.cover?item.cover:item.imgurl" alt="">
          <div class="lv"></div>
        </div>
        </router-link>
        <router-link :to="'/play/mv/'+item.id">
        <div class="text">
          <span class="mvName">{{item.name}}</span>
          <span class="durationTime">{{item.duration}} By {{item.artistName}}</span>
        </div>
        </router-link>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'mvList',
      props: {
        data: {
          type: Array,
          default: []
        }
      },
      data() {
        return {}
      },
      mounted() {

      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
 .mvList
  width:98%;
  margin-left 1%;
  height:auto;
  position:relative;
  .item
   width:100%;
   height:100%;
   display :flex;
   margin-bottom :5px;
   .imgBox
     position:relative;
     width:100px;
     height:60px;
     img
      width:85px;
      height:60px;
      position:absolute;
      top:0px;
      left:0px;
     .lv
      width:85px;
      height:100%;
      background:rgba(0,0,0,0.2);
      color:white;
      position:absolute;
      top:0px;
      left:0px;
   .text
     flex:1;
    .mvName
     font-size :16px;
     padding-top 3px;
     line-height :20px;
     display block;
     width:100%;
     color:$color-font-title;
     display: -webkit-box;
     -webkit-box-orient: vertical;
     -webkit-line-clamp: 2;
     overflow: hidden;
     height:40px;
    .durationTime
     display block;
     font-size :10px;
     padding-top :5px;
     color:#c3bcbd;
</style>
