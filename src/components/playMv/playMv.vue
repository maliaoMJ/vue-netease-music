<template>
    <div class="playMv">
      <div class="mvBox">
        <title-header :title="mvData.name"></title-header>
        <video  controls :src="'http://114.67.151.28:3000/mv/url?url='+mvData.brs['480']"></video>
        <scroll ref="scroll" class="scrollComponents" :data="newComments" >
          <div>
            <div class="textBox">
              <div class="author">
                <img :src="mvData.cover" alt="">&nbsp; <span class="userName">{{mvData.artistName}}</span>
              </div>
              <div class="desc">
                {{mvData.name}}
              </div>
              <div class="data">
                <span class="time">发布时间:{{mvData.publishTime}}</span><span class="playcount">播放次数:{{mvData.playCount}}</span>
              </div>
              <div class="menu">
                <div class="item"><div class="itemContent"><icon class="icon" name="thumbs-o-up"></icon><span>{{mvData.likeCount}}</span></div></div>
                <div class="item"><div class="itemContent"><icon class="icon"  name="heartbeat"></icon><span>{{mvData.subCount}}</span></div></div>
                <div class="item"><div class="itemContent"><icon class="icon" name="comments-o"></icon><span>{{mvData.commentCount}}</span></div></div>
                <div class="item"><div class="itemContent"><icon class="icon" name="share-alt"></icon><span>{{mvData.shareCount}}</span></div></div>
                <div class="clear"></div>
              </div>
              <module-title title="相似MV"></module-title>
                <mv-list :data="similarMvs" class="needsclick" @click="_fresh"></mv-list>
              <module-title title="热门评论" ></module-title>
              <comment-list :data="hotComments"></comment-list>
              <module-title title="最新评论"></module-title>
              <comment-list :data="newComments"></comment-list>
            </div>
          </div>
        </scroll>
      </div>
    </div>
</template>

<script>
  import mvList from '../../components/mvList/mvList.vue'
  import commentList from '../../components/commentList/commentList.vue'
  import moduleTitle from '../../components/moduleTitle/moduleTitle.vue'
  import scroll from '../../base/scroll/scroll.vue'
  import titleHeader from '../../components/header/titleHeader.vue'
  export default {
    name: 'playMv',
    components: {
      mvList,
      commentList,
      moduleTitle,
      scroll,
      titleHeader
    },
    data() {
      return {
        mvData: {},
        hotComments: [],
        newComments: [],
        similarMvs: []
      }
    },
    computed: {
      mvId() {
        return this.$route.params.id
      }
    },
    mounted() {
      this._fresh()
    },
    methods: {
      _getMvData() {
        this.$http.get('http://114.67.151.28:3000/mv?mvid=' + this.mvId)
          .then(response => {
            this.mvData = response.data.data
          })
          .catch(error => {
            console.log('get mv data is error ' + error)
          })
      },
      _getSimilarMvs() {
        this.$http.get('http://114.67.151.28:3000/simi/mv?mvid=' + this.mvId)
          .then(response => {
            this.similarMvs = response.data.mvs
          })
          .catch(error => {
            console.log('get mv data is error ' + error)
          })
      },
      _getComments() {
        this.$http.get('http://114.67.151.28:3000/comment/mv?id=' + this.mvId + '&limit=20')
          .then(response => {
            this.hotComments = response.data.hotComments
            this.newComments = response.data.comments
          })
          .catch(error => {
            console.log('get mv data is error ' + error)
          })
      },
      _fresh() {
        this._getMvData()
        this._getSimilarMvs()
        this._getSimilarMvs()
        this._getComments()
      }
    },
    watch: {
      $route() {
        this._fresh()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
  .playMv
   width:100%;
   height:100%;
   position:absolute;
   top:0px;
   left:0px;
   background : white;
   overflow hidden;
   .mvBox
    width:100%;
    height:93%;
    position:absolute;
    top:0px;
    left:0px;
    video
     width:100%;
     position :relative;
     top:0px;
     left:0px;
     z-index :666;
    .scrollComponents
     height:66%;
     overflow hidden;
     .textBox
      width:100%;

      .author
       width:96%;
       height:40px;
       margin-left :2%;
       position:relative;
       top:0px;
       left:0px;
       font-size :14px;
       vertical-align bottom;
       img
        width:30px;
        height:30px;
        border-radius :15px;
        margin-top 5px;
       .userName
        vertical-align:middle;
        color:$color-font-title
      .desc
        width:96%;
        height:40px;
        margin-left :2%;
        position:relative;
        top:0px;
        left:0px;
        font-size :16px;
        text-overflow :ellipsis;
        overflow :hidden;
        white-space:nowrap;
        line-height :40px;
        color:black;
      .data
        width:96%;
        height:20px;
        margin-left :2%;
        position:relative;
        top:0px;
        left:0px;
        font-size :14px;
        padding-top 10px;
        color: #c3bcbd;
        .time
         border-right:1px solid gainsboro;
         padding-right 20px;
        .playcount
         padding-left 20px;
      .menu
        width:100%;
        height:60px;
        position:relative;
        top:0px;
        left:0px;
        .item
         width:25%;
         height:100%;
         float :left;
         .itemContent
          width:50px;
          height:50px;
          margin:0 auto;
          margin-top :10px;
          .icon
           width:30px;
           height:30px;
           text-align center;
           line-height :30px;

           margin-left:9px;
           color:#c3bcbd;
          span
           color:#c3bcbd;
           font-size :12px;
           height:14px;
           width:100%;
           display block;
           text-align center;
           padding-top 5px;
        .clear
          clear:both

</style>
