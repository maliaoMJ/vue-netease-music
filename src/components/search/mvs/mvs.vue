<template>
  <div class="mvs">
    <scroll :data="mvsData" class="scrollComponents" ref="scroll">
      <div>
        <div class="no_data" v-show="mvsData.length===0">
          暂无查询数据
        </div>
        <mv-list :data="mvsData"></mv-list>
      </div>
    </scroll>
  </div>
</template>

<script>
  import scroll from '../../../base/scroll/scroll.vue'
  import mvList from '../../../components/mvList/mvList.vue'
  export default {
    name: 'users',
    components: {
      scroll,
      mvList
    },
    data () {
      return {
        mvsData: []
      }
    },
    methods: {
      _getSongs(keywords) {
        this.$http.get('http://114.67.151.28:3000/search?type=1004&limit=50&keywords=' + keywords)
          .then(response => {
            if (response.data.result.mvs !== undefined) {
              this.mvsData = response.data.result.mvs
            }
          })
          .catch(error => {
            console.log('搜索用户失败' + error)
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
        if (this.$route.path === '/search/mvs') {
          this._getSongs(this.$route.query.type)
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable.styl"
  .mvs
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
</style>
