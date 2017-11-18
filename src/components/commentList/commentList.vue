<template>
    <div class="commentList">
      <div class="item" v-for="item in data">
        <div class="info">
          <div class="imgBox">
            <img :src="item.user.avatarUrl" alt="">
          </div>
          <div class="text">
            <p class="desc"><span class="userName">{{item.user.nickname}}</span><span class="likecount">{{item.likedCount}}&nbsp;<icon name="thumbs-o-up"></icon></span></p>
            <p class="time">{{item.time | formatDate}}</p>
          </div>
        </div>
        <div class="content">
          <div class="space">
          </div>
          <div class="text">
             {{item.content}}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'commentList',
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
  .commentList
   width:96%;
   height:auto;
   margin-left 2%;
   .item
    min-height 40px;
    position:relative;
    padding-bottom :5px;
    border-bottom :1px solid #c3bcbd;
    &last-child
     border:none;
    .info
     width:100%;
     height:45px;
     display :flex;
     .imgBox
      width:40px;
      height:40px;
      img
       width:30px;
       height:30px;
       margin:5px;
       border-radius :15px;

     .text
      flex:1;
      .desc
       width:100%;
       height:30px;
       margin:0px;
       .userName
        float :left;
        color:black;
       .likecount
        float:right;
        padding-right 5px;
        color:#c3bcbd;
      .time
       font-size :10px;
       color:#c3bcbd;
       padding-top :3px;
    .content
     padding-top :10px;
     padding-bottom :10px;
     display flex;
     .space
      width:20px;
      height:20px;
     .text
      flex:1;
      color:$color-font-title;
      line-height :20px;
</style>
