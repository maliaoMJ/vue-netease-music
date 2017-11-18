<template>
  <div class="singers">
    <scroll :data="singersData" class="scrollComponents" ref="scroll">
      <div>
        <div class="no_data" v-show="singersData.length===0">
          暂无查询数据
        </div>
        <div class="items needsclick" v-for="item in singersData">
          <div class="imgBox">
            <img v-lazy="item.picUrl" alt="">
          </div>
          <div class="singerInfo">
            <p class="singerName">{{item.name}}&nbsp;{{item.trans?'('+item.trans+')':''}}</p>
          </div>
          <router-link :to="'/singers/'+item.id">
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
    name: 'singers',
    components: {
      scroll
    },
    data () {
      return {
        singersData: []
      }
    },
    methods: {
      _getSongs(keywords) {
        this.$http.get('http://114.67.151.28:3000/search?type=100&limit=80&keywords=' + keywords)
          .then(response => {
            if (response.data.result.artists !== undefined) {
              this.singersData = response.data.result.artists
            }
          })
          .catch(error => {
            console.log('搜索专辑失败' + error)
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
        if (this.$route.path === '/search/singers') {
          this._getSongs(this.$route.query.type)
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable.styl"
  .singers
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
        .singerInfo
          flex:1;
          text-overflow ellipsis;
          white-space nowrap;
          overflow: hidden;
          .singerName
            padding-top :15px;
            font-size :16px;
            color:$color-font-title ;
            text-overflow ellipsis;
            white-space nowrap;
            overflow: hidden;
            padding-bottom :7px;
        .iconleft
          width:44px;
          height:44px;
          text-align center;
          line-height 44px;
          .icon
            color:gray;
</style>
