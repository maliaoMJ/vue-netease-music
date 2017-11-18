<template>
  <div id="app">
      <router-view/>
      <play-control></play-control>
  </div>
</template>

<script>
import playControl from './components/playControl/playControl.vue'
export default {
  name: 'app',
  components: {
    playControl
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 #app
   position:absolute;
   width:100%;
   height:100%;
   top:0px;
   left:0px;
   background:#eee;
   overflow hidden;
</style>
