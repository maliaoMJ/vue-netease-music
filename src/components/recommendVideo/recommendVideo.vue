<template>
    <div class="RecommendVideo">
      <scroll  ref="scroll" class="scrollComponents" :data="mvDetails">
          <div>
            <div class="Item_video" v-show="mvDetails" v-for="item in mvDetails">
              <div class="videoItem">

                 <img v-lazy="item.cover" alt="">

                <div class="lv_video needsclick">
                  <router-link :to="'/play/mv/'+item.id">
                  <div class="top">
                    <img v-lazy="item.cover" class="userImg needsclick" alt="">&nbsp;<span class="userName">{{item.artistName}}</span>
                  </div>
                  <div class="center">
                    <div class="iconBoxs needsclick">
                      <icon class="icon needsclick" name="play"></icon>
                    </div>
                  </div>
                  <div class="bottom">
                    <span class="palyCount"><icon class="icon" name="video-camera"></icon>&nbsp;{{item.playCount}}</span>
                    <span class="playTime"><icon class="icon" name="clock-o"></icon>&nbsp;{{item.publishTime}}</span>
                  </div>
                  </router-link>
                </div>
              </div>
              <div class="text">
                {{item.desc}}
              </div>
            </div>
          </div>
      </scroll>
    </div>
</template>

<script>
    import scroll from '../../base/scroll/scroll.vue'
    export default {
      name: 'RecommendVideo',
      data() {
        return {
          mvDetails: []
        }
      },
      components: {
        scroll
      },
      mounted() {
        this.$nextTick(() => {
          this._getMvId()
          this.$refs.scroll.refresh()
        })
      },
      methods: {
        _getMvDetail(mvId) {
          this.$http.get('http://114.67.151.28:3000/mv?mvid=' + mvId)
            .then((response) => {
            })
            .catch(error => {
              console.log('获取mv详情失败' + error)
            })
        },
        _getMvId() {
          var tempArr = []
          this.$http.get('http://114.67.151.28:3000/top/mv?limit=30')
            .then((response) => {
              let tempData = response.data.data
              for (let i = 0; i < tempData.length; i++) {
                this.$http.get('http://114.67.151.28:3000/mv?mvid=' + tempData[i].id)
                  .then((response) => {
                    let detailtmp = response.data.data
                    tempArr.push(detailtmp)
                    this.mvDetails = tempArr
                  })
                  .catch(error => {
                    console.log('获取mv详情失败' + error)
                  })
              }
            })
            .catch((error) => {
              console.log('获取mvid失败' + error)
            })
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
  .RecommendVideo
    flex:1;
    position:absolute;
    height:82%;
    top:80px;
    left:0;
    width:100%;
   .scrollComponents
     height:100%;
     overflow hidden;
     .Item_video
       width:100%;
       margin-bottom 13px;
       position:relative;
       .videoItem
        width:100%;
        height:180px;
        position:relative;
        img
         position absolute;
         top:0px;
         left:0px;
         width:100%;
         height:100%;
        .lv_video
         display: block;
         position: absolute;
         top: 0px;
         left: 0px;
         width: 100%;
         heihgt: 100%;
         background: rgba(0,0,0,0.1);
         height: 180px;
         .top
          width: atuo;
          height: 40px;
          color:white;
          .userImg
            width: 30px;
            height: 30px;
            margin-top: 5px;
            border-radius: 15px;
            margin-left: 15px;
          .userName
            display: inline-block;
            padding-left: 45px;
            padding-top: 12px;
            font-size 14px;
            color:white;

         .center
          display: block;
          width: 100%;
          height: 70px;
          padding-top: 30px;
          color:white;
          .iconBoxs
            width: 40px;
            height: 40px;
            background: rgba(0,0,0,0.5);
            border-radius: 20px;
            margin: 0 auto;
            text-align: center;
            color:white;
            .icon
              display: block;
              width:20px;
              height:20px;
              padding-top:10px;
              padding-left 10px;
              text-align center;
              line-height :20px;
              font-size 18px;
              color:white;
         .bottom
          display: block;
          position: absolute;
          bottom: 0px;
          width: 100%;
          hieght: 30px;
          height: 24px
          color:white;
          .palyCount
           font-size: 10px;
           position: absolute;
           left: 13px;
           color:white;
           .icon
            font-size 16px;
            vertical-align bottom;
            color:white;
          .playTime
            position: absolute;
            right: 10px;
            top: 0px;
            font-size: 10px;
            color:white;
            .icon
              font-size 16px;
              vertical-align bottom;
              color:white;

       .text
        width: 96%;
        padding-left: 2%;
        font-size: 15px;
        color: #494a4a;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        padding-top: 10px;
        line-height: 18px;
</style>
