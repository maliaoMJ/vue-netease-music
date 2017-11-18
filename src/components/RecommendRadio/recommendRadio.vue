<template>
  <!--电台改为排行榜-->
    <div class="recommendRadio">
      <scroll  ref="scroll" class="scrollComponents" :data="rankList">
        <div>
          <div class="Items needsclick" v-show="rankList" v-for="item in rankList">

               <div class="index">{{item.idx+1}}</div>
               <div class="text">{{item.type}}</div>
            <router-link :to="/ranklist/+item.idx">
               <div class="icon_right needsclick"><icon class="icon needsclick" name="angle-right"></icon></div>
             </router-link>
          </div>
        </div>
      </scroll>
    </div>
</template>

<script>
  import scroll from '../../base/scroll/scroll.vue'
  export default {
    name: 'RecommendRadio',
    data() {
      return {
        rankList: [
            {idx: 0, type: '云音乐新歌榜'},
            {idx: 1, type: '云音乐热歌榜'},
            {idx: 2, type: '网易原创歌曲榜'},
            {idx: 3, type: '云音乐飙升榜'},
            {idx: 4, type: '云音乐电音榜'},
            {idx: 5, type: 'UK排行榜周榜'},
            {idx: 6, type: '美国Billboard周榜'},
            {idx: 7, type: 'KTV嗨榜'},
            {idx: 8, type: 'iTunes榜'},
            {idx: 9, type: 'Hit FM Top榜'},
            {idx: 10, type: '日本Oricon周榜'},
            {idx: 11, type: '韩国Melon排行榜周榜'},
            {idx: 12, type: '韩国Mnet排行榜周榜'},
            {idx: 13, type: '韩国Melon原声周榜'},
            {idx: 14, type: '中国TOP排行榜(港台榜)'},
            {idx: 15, type: '中国TOP排行榜(内地榜)'},
            {idx: 16, type: '香港电台中文歌曲龙虎榜'},
            {idx: 17, type: '华语金曲榜'},
            {idx: 18, type: '中国嘻哈榜'},
            {idx: 19, type: '法国 NRJ EuroHot 30周榜'},
            {idx: 20, type: '台湾Hito排行榜'},
            {idx: 21, type: 'Beatport全球电子舞曲榜'}
        ]
      }
    },
    components: {
      scroll
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .recommendRadio
    flex:1;
    position:absolute;
    height:82%;
    top:80px;
    left:0;
    width:100%;
    .scrollComponents
      height:100%;
      overflow hidden;
      .Items
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
          color:$color-font-title;
        .text
          flex: 1;
          text-align: left;
          line-height: 40px;
          padding-left :10px;
          color:$color-font-title;
          text-overflow:ellipsis;
          overflow hidden;
          white-space:nowrap;
        .icon_right
          width:30px;
          height:40px;
          line-height :40px;
          text-align :center;
          .icon
           font-size :22px;
           color: #959595;


</style>
