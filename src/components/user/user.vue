<template>
    <div class="user_detail">
      <title-header title="用户详情"></title-header>
       <div class="user_info_box">
        <div class="user_background_img_box">
          <img src="http://p1.music.126.net/9u7D7l0R37WD7WAiqyQIpg==/18757668371883102.jpg" class="user_background_img" alt="">
        </div>
        <div class="user_info_content">
          <div class="tab">
            <div :class="[type==='list'?'active':'','item']" @click="_changeType('list')">我的歌单</div>
            <div :class="[type==='rank'?'active':'','item']" @click="_changeType('rank')">听歌排行</div>
            <div :class="[type==='info'?'active':'','item']" @click="_changeType('info')">详细信息</div>
          </div>
          <div class="user_result_box">
          <scroll :data="computedData" class="user_scroll" ref="users">
            <div>

              <div v-if="type==='list'" class="list">
                   <modult-title title="自建歌单"></modult-title>
                   <div class="item_list" v-for="item in createList">
                     <router-link :to="'/playlists/'+item.id">
                       <ablum-list :data="createList">
                         <img v-lazy="item.coverImgUrl" slot="albumimg" alt="">
                         <span slot="albumname">{{item.name}}</span>
                         <span slot="albumsub">{{item.trackCount}}首&nbsp;&nbsp;{{item.playCount}}次</span>
                       </ablum-list>
                     </router-link>
                   </div>
                 <modult-title title="收藏歌单"></modult-title>
                 <div v-for="item in collectList">
                   <router-link :to="'/playlists/'+item.id">
                     <ablum-list :data="collectList">
                       <img v-lazy="item.coverImgUrl" slot="albumimg" alt="">
                       <span slot="albumname">{{item.name}}</span>
                       <span slot="albumsub">{{item.trackCount}}首&nbsp;&nbsp;{{item.playCount}}次</span>
                     </ablum-list>
                   </router-link>
                 </div>
               </div>
              <div v-else-if="type==='rank'" class="rank">
                <div v-for="(item,index) in playRank" @click="chooseMusic(index)" >
                  <music-public-list>
                    <span slot="name">{{item.song.name}}</span>
                    <span slot="sub">{{item.song.ar[0].name}}-{{item.song.name}}</span>
                  </music-public-list>
                </div>
              </div>
              <div v-else class="info" style="color:red;">
                暂未开发
              </div>

            </div>
          </scroll>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import scroll from '../../base/scroll/scroll.vue'
    import titleHeader from '../../components/header/titleHeader.vue'
    import modultTitle from '../../components/moduleTitle/moduleTitle.vue'
    import ablumList from '../../components/ablumList/ablumList.vue'
    import musicPublicList from '../../components/musicList/musicPublicList.vue'
    export default {
      name: 'user',
      components: {
        titleHeader,
        scroll,
        modultTitle,
        ablumList,
        musicPublicList
      },
      data() {
        return {
          computedData: [],
          userInfo: {},
          playList: [],
          collectList: [],
          createList: [],
          playRank: [],
          type: 'list',
          once: true
        }
      },
      computed: {
      },
      methods: {
        _changeType(type) {
          this.type = type
          this.$refs.users.refresh()
          this.$refs.users.scrollTo(0, 0)
          if (type.toString() === 'list') {
            this.computedData = this.playList
          } else if (type.toString() === 'rank') {
            this.computedData = this.playRank
          } else {
            this.computedData = []
          }
        },
        _getUserPlayList(uid) {
          this.$http.get(`http://114.67.151.28:3000/user/playlist?uid=${uid}`)
            .then(response => {
              this.playList = response.data.playlist
              for (let i = 0; i < this.playList.length; i++) {
                if (this.playList[i].creator.userId.toString() === uid.toString()) {
                  this.createList.push(this.playList[i])
                } else {
                  this.collectList.push(this.playList[i])
                }
              }
            })
            .catch(error => {
              console.log('get user playList is error' + error)
            })
        },
        _getUserPlayRank(uid) {
          this.$http.get(`http://114.67.151.28:3000/user/record?uid=${uid}&type=1`)
            .then(response => {
              this.playRank = response.data.weekData
            })
            .catch(error => {
              console.log('获取用户播放记录失败' + error)
            })
        },
        _getUserInfo(uid) {
          this.$http.get(`http://114.67.151.28:3000/user/detail?uid=${uid}`)
            .then(response => {
//              console.log(response.profile)
            })
            .catch(error => {
              console.log('获取用户信息失败' + error)
            })
        },
        __refresh() {
          this._getUserPlayList(this.$route.params.uid)
          this._getUserPlayRank(this.$route.params.uid)
          this._getUserInfo(this.$route.params.uid)
        },
        chooseMusic(index) {
          this.$store.commit('setPlayCurrentMusic', index)
          if (this.once) {
            var tempSongsData = this.formatSongsDataWeekData(this.playRank)
            this.$store.commit('setPlayList', tempSongsData)
            this.$store.commit('setPlayState', true)
            this.once = false
          }
        }
      },
      mounted() {
        this.$nextTick(() => {
          this._getUserPlayList(this.$route.params.uid)
          this._getUserPlayRank(this.$route.params.uid)
          this._getUserInfo(this.$route.params.uid)
          this.computedData = this.playList
          setTimeout(() => {
            this.$refs.users.refresh()
          }, 500)
        })
      },
      watch: {
        '$route'() {
          this._refresh()
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
  .user_detail
   width:100%;
   height:100%;
   display :flex;
   flex-direction column;
   overflow hidden;
   .user_info_box
    flex:1;
    display flex;
    flex-direction column;
    position:relative;
    padding-top :150px;
    .user_background_img_box
     width:100%;
     height:150px;
     position:absolute;
     top:0px;
     left:0px;
     .user_background_img
      width:100%;
      height:100%;

    .user_info_content
     flex :1;
     display flex;
     flex-direction column;
     .tab
      width:100%;
      height:30px;
      background:white;
      display: flex;
      flex-direction: row;
      .item
       flex :1;
       line-height 30px;
       text-align :center;
       color:$color-font-title;
       font-size :14px;
       box-sizing border-box;
       &.active
        border-bottom 2px solid $color-header;
     .user_result_box
      flex:1;
      padding-bottom :50px;
      overflow hidden;
      .user_scroll
       width:100%;
       height:100%;
       overflow hidden;
       .item_list
        margin-bottom :4px;
</style>
