<template>
    <div class="titleHeader">
      <div class="icon_left needsclick" @click="goback"><icon class="icon needsclick" name="angle-left"></icon></div>
      <div class="text">{{title}}</div>
    </div>
</template>

<script>
    export default {
      name: 'titleHeader',
      props: {
        title: {
          type: String,
          default: ''
        }
      },
      data() {
        return {}
      },
      methods: {
        goback() {
          this.$router.go(-1)
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .titleHeader
    display: flex;
    width:100%;
    height:40px;
    background:$color-header;
    .icon_left
      width:30px;
      text-align :center;
      height:40px;
      .icon
        margin-top 10px;
        transform scale(2)
    .text
      flex 1;
      font-size 16px;
      line-height :37px;
      text-overflow ellipsis;
      overflow hidden;
      white-space nowrap;

</style>
