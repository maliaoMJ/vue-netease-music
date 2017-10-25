<template>
  <div id="app">
    <app-header></app-header>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import appHeader from './components/header/Header'
export default {
    name: 'app',
    components: {
      appHeader
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
</style>
