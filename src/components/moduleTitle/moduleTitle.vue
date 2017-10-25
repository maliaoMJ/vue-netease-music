<template>
    <div class="moduleTitle">
      <h6>{{title}} <router-link to="/index" class="links"><icon class="icon-right" name="chevron-right"></icon></router-link></h6>
    </div>
</template>

<script>
    export default {
      name: 'moduleTitle',
      props: {
        title: {
          type: String,
          default: 'moduleTitle'
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .moduleTitle
    h6
     width:auto;
     height:30px;
     text-align :left;
     line-height :30px;
     border-left :4px $color-header solid;
     font-size 15px;
     padding-left :20px;
     color:$color-font-title;
     letter-spacing 1px;

     .links
       .icon-right
        vertical-align middle;
        font-size :10px;
        color:$color-font-sub;
</style>
/
