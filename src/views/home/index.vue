<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        type="info"
        round
        size="small"
        to ='/search'
      ></van-button>
    </van-nav-bar>

<van-tabs v-model="active" class="channel-tabs">
  <van-tab
  class="tab-item"
  v-for="channel in channels"
  :title="channel.name"
  :key="channel.id"
  > <article-list :channel ='channel' /> </van-tab>
   
<div slot="nav-right" @click="isChannelEitShow =true" class="wap-nav-wrap">
  <van-icon name='wap-nav'></van-icon>
</div>
<dir class="wap-nav-placeholder" slot="nav-right"></dir>


</van-tabs>

<van-popup 
class="channel-edit-popup"
position ='bottom'
closeable
v-model="isChannelEitShow"
close-icon-position ='top-left'
style="height:100%"
> 
<channel-edit :active ='active' @close=' isChannelEitShow =false' @update-active='active =$event' :userChannels=' channels'></channel-edit>

</van-popup>

  </div>
</template>

<script>
import {getUserChannels} from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import {mapstate} from 'vuex'
import {getItem} from '@/utils/storage'



export default {
  name: "HomeIndex",
  data () {
    return {
      active:0,
      channels:[],
      isChannelEitShow:false
    }
  },
  components:{
      ArticleList,
      ChannelEdit
    
    
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels(){
      // const {data} =await getUserChannels()
      // console.log(data.data.channels);
      // this.channels =data.data.channels
      let channels = []
      if(this.user){
        const {data} =await getUserChannels()
        this.channels =data.data.channels
      }
      else{
    const localChannels =getItem('user-channels')
    if(localChannels){
      channels =localChannels
    }else{
     const {data} =await getUserChannels ()
     channels = data.data.channels
    }
      }
      this.channels =channels
    },
    
    
  }
};
</script>

<style scoped lang='less'>
.home-container {
 
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  .channel-tabs{
    /deep/ .van-tab{
      border-right: 1px solid #edeff3 ;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      width: 15px !important;
      height: 3px;
      bottom: 20px;
      background: #3296fa;
    }
  }
  .wap-nav-wrap{
    position:fixed;
    right: 0;
    height: 33px;
    line-height:43px;
    background: #fff;
    display: flex;
    justify-items: center;
    align-items: center;
    opacity: .9;
    .van-icon{
font-size: 24px;
    }
    &::before{
      content:'';
      width:1px ;
      height: 43px;
      background-size:contain ;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .wap-nav-placeholder{
   
    flex-shrink: 0;
  }
  // /deep/ .van-tabs__wrap--scrollable .van-tabs__nav--complete{
  //   padding: 0px;
  // }
  /deep/ .van-tab{
    padding: 0px;
    flex-basis: 22% !important;
  }
  }

  .channel-edit-popup{
    height: 100%;
}
</style>