<template>
    <div class="search">
      <div class="header">
        <div class=" needsclick left_icon" @click="goback">
          <icon class="icon" name="angle-left"></icon>
        </div>
        <div class="searchInput">
          <input type="text" class="keywords" placeholder="关键词" v-model="inputKeywords">
        </div>
        <div class="text" @click="_submitKeywords">
          搜索
        </div>
      </div>
      <!--伴随搜索结果产生-->
      <div class="search_tab" v-show="true" ref="scrolls">
       <div class="tab_box">
         <router-link class="links needsclick" :to="'/search/songs?type='+keywords"><div class="tab_item active">单曲</div></router-link>
         <router-link class="links needsclick" :to="'/search/albums?type='+keywords"><div class="tab_item">专辑</div></router-link>
         <router-link class="links needsclick" :to="'/search/playlist?type='+keywords"><div class="tab_item">歌单</div></router-link>
         <router-link class="links needsclick" :to="'/search/singers?type='+keywords"><div class="tab_item">歌手</div></router-link>
         <router-link class="links needsclick" :to="'/search/users?type='+keywords"><div class="tab_item">用户</div></router-link>
         <router-link class="links needsclick" :to="'/search/mvs?type='+keywords"><div class="tab_item">MV</div></router-link>
         <!--<router-link class="links needsclick" :to="'/search/lyrics?type='+keywords"><div class="tab_item">歌词</div></router-link>-->
         <router-link class="links needsclick" :to="'/search/radio?type='+keywords"><div class="tab_item">电台</div></router-link>
       </div>
      </div>
      <!--伴随搜索结果出现而消失-->
      <div v-show="false" class="singer_box">
        <router-link to="/index" class="needsclick">
          <icon class="icon" name="user-secret"></icon>&nbsp;&nbsp;
          <span class="text">歌手分类</span>&nbsp;&nbsp;
          <icon class="icon" name="angle-right"></icon>
        </router-link>
      </div v-s>
      <div class="sugTips">
      </div>
      <div class="result">
        <keep-alive>
          <transition name="fade">
           <router-view></router-view>
          </transition>
        </keep-alive>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'search',
    components: {
    },
    data() {
      return {
        inputKeywords: 'HelloDoctor',
        keywords: ''
      }
    },
    computed: {
    },
    methods: {
      _initScroll() {
        this.scroll = new BScroll(this.$refs.scrolls, {
          scrollX: true,
          scrollY: false,
          click: true
//          bounce: false
        })
      },
      goback() {
        this.$router.back()
      },
      _scrollStart() {
        if (this.scroll) {
          this.scroll.scrollTo(0, 0, 0)
        }
      },
      trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '')
      },
      _submitKeywords() {
        this.keywords = this.trim(this.inputKeywords)
        if (this.keywords.length === 0) {
          alert('请输入关键词')
        } else {
          this._scrollStart()
          this.$router.push({path: '/search/songs?type=' + this.keywords})
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll()
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
  .search
    width:100%;
    height:100%;
    position:absolute;
    top:0px;
    left:0px;
    background:white;
    .header
     z-index :110;
     position:absolute;
     top:0px;
     left:0px;
     width:100%;
     height:40px;
     display flex;
     background :$color-header;
     .left_icon
      width:30px;
      height:100%;
      margin:0px;
      padding:0px;
      .icon
       display block;
       width:20px;
       height:20px;
       margin:5px;
       margin-top 8px;
       transform :scale(1.5);
     .searchInput
      flex:1;
      .keywords
       display:block;
       width:94%;
       height:70%;
       margin-left :2%;
       margin-top :5px;
       border-radius :5px;
       padding-left :5px;
       background:rgba(255,255,255,0.4);
       line-height :14px;
       color:white;
       font-size :14px;
       outline :none;
       /*outline-color lightgoldenrodyellow;*/
     .text
      width:40px;
      height:40px;
      text-align center;
      line-height :36px;
      font-size :14px;
    .search_tab
     position:absolute;
     top:40px;
     z-index :110;
     left:0px;
     width:100%;
     height:30px;
     background:white;
     overflow hidden;
     .tab_box
      width:147%;
      height:100%;
      .links
        display:block;
        float :left;
        width:14%;
        height:30px;
        &.router-link-active
          border-bottom:3px solid $color-header;
          color:$color-header;
          box-sizing :border-box;
        .tab_item
          display block;
          width:100%;
          height:100%;
          text-align :center;
          line-height :30px;
          font-size :14px;
          color:$color-font-title;

    .singer_box
     width:100%;
     height:40px;
     background :$color-header;
     text-align :center;
     line-height :40px;
     font-size :14px;
     background:white;
     border-bottom :1px solid #c3bcbd;
     box-sizing :border-box;
     .icon
       vertical-align:middle;
       color: #c3bcbd;
       transform scale(1.2)
     .text
       color:gray;
       letter-spacing :1px;
    .result
     position:absolute;
     top:70px;
     width:100%;
     height:89%;
     z-index :100;
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>
