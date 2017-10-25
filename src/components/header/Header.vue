<template>
  <div class="header">
    <div class="left">
      <span><icon name="list-ul" class="icon-list-ul"></icon></span>
    </div>
    <div class="center">
      <h4 class="title">vue-music</h4>
    </div>
    <div class="right">
      <span><icon name="search" class="icon-search"></icon></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" >
  @import "../../common/stylus/variable.styl"
  .header
    display: flex;
    width:100%;
    height:40px;
    background:$color-header;
    .left
      flex:1;
      color:white;
      line-height:40px;
      text-align:center;
      height:100%;
      span
        cursor:pointer;
        .icon-list-ul
          margin-top 10px;
          display inline-block;
          width:20px;
          height:20px;
    .center
      flex:5;
      text-align center;
      line-height 40px;
      .title
       font-size 25px;
    .right
      flex: 1
      text-align:center;
      span
       cursor:pointer;
       .icon-search
          margin-top 10px;
          display inline-block;
          width:20px;
          height:20px;
</style>
