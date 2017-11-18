<template>
    <div class="songs">
      <scroll :data="songsData" class="scrollComponents" ref="scroll">
         <div>
            <div class="no_data" v-show="songsData.length===0">
              暂无查询数据
            </div>
             <div class="items needsclick" v-for="(item,index) in songsData" @click="chooseMusic(index)">
               <div class="songInfo">
                 <p class="songName">{{item.name}}</p>
                 <p class="songAuthor">{{item.artists[0].name}}-{{item.album.name}}</p>
               </div>
               <div class="iconBox">
                 <icon name="play" class="icon"></icon>
               </div>
             </div>
           </div>
      </scroll>
    </div>
</template>

<script>
    import scroll from '../../../base/scroll/scroll.vue'
    export default {
      name: 'songs',
      components: {
        scroll
      },
      data () {
        return {
          songsData: [],
          once: true
        }
      },
      computed: {
      },
      methods: {
        _getSongs(keywords) {
          this.$http.get('http://114.67.151.28:3000/search?type=1&limit=80&keywords=' + keywords)
            .then(response => {
              if (response.data.result.songs !== undefined) {
                this.songsData = response.data.result.songs
              }
            })
            .catch(error => {
              console.log('搜索单曲失败' + error)
            })
        },
        chooseMusic(index) {
          this.$store.commit('setPlayCurrentMusic', index)
          if (this.once) {
            var tempSongsData = this.formatSongsDataSearch(this.songsData)
            console.log(tempSongsData)
            this.$store.commit('setPlayList', tempSongsData)
            this.$store.commit('setPlayState', true)
            this.once = false
          }
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
          if (this.$route.path === '/search/songs') {
            this._getSongs(this.$route.query.type)
          }
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.songs
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
      .songInfo
       flex:1;
       text-overflow ellipsis;
       white-space nowrap;
       overflow: hidden;
       .songName
        padding-top :5px;
        font-size :16px;
        color: #899cfa;
        text-overflow ellipsis;
        white-space nowrap;
        overflow: hidden;
        padding-bottom :7px;
       .songAuthor
        font-size :12px;
        color:gray;
        text-overflow ellipsis;
        white-space nowrap;
        overflow: hidden;
      .iconBox
       width:44px;
       height:44px;
       text-align center;
       line-height 44px;
       border-radius :44px;
       border:2px solid #c5c5c5;
       box-sizing :border-box;
       transform :scale(0.65)
       .icon
        color:gray;
</style>
