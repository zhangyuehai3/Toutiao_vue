<template>
  <div class="channel-edit"> 
 <van-cell center :border ='false'>
    <div slot="title" class="channel-title"> 我的频道</div>
    <van-button 
    type ='danger'
    plain
    round
    size ='mini'
    @click="isEdit =! isEdit"
    >
    {{ isEdit ? '完成' : '编辑'}}

    </van-button>




 </van-cell>
 <van-grid :gutter='10'>
  <van-grid-item
     class="grid-item "
     :class=" { active :index !== 0}? 'clear' :''"
  v-for="(channel,index) in userChannels"
  :icon ='(isEdit&& index!==0) ? "clear" : ""'
  :key=" index"
  :text ='channel.name'
  @click=" onUserChannelClick(channel,index)"/>
  

  

 </van-grid>

  <van-cell center :border ='false'>
    <div slot="title" class="channel-title"> 频道退键</div>
  




 </van-cell>
 <van-grid :gutter='10'>
  <van-grid-item
class="grid-item"
  v-for="(channel,index) in recommendChannels"
  :key=" index"
  :text ='channel.name'
  @click="onAdd( channel)"
  />
  

 </van-grid>









  </div>
</template>

<script>
import { getAllChannels,addUserChannel,deleteUserChannel } from "@/api/channels"
import { mapState} from 'vuex'
import { setItem} from '@/utils/storage'

export default {
name:' ChannelEdit',
data () {
    return {
        allChannels:[],
        isEdit :false,
    }
},
computed: {
    ...mapState(['user']),
  recommendChannels(){
     return this.allChannels.filter(channel =>{
         return !this.userChannels.find(userChannel =>{
             return userChannel.id ===channel.id
         })
     })

  }  
},
props: {
    userChannels:{
        type:Array,
        required:true
    },
    active :{
        type:Number,
        required:true
    }
},
created () {
    this.loadAllChannels()
},
methods: {
    async loadAllChannels(){
        const {data} = await getAllChannels()
       this.allChannels = data.data.channels


    },
   async onAdd (channel){
        this.userChannels.push(channel)
        if(this.user){
          await  addUserChannel({
                id: channel.id ,
                seq: this.userChannels.length
            })
        }else{
          setItem('user-channels' ,this.userChannels)
        }
         

    },
    onUserChannelClick (channel,index){
        if ( this.isEdit && index!==0){
            this.deleteChannel(channel,index)
        }else{
            this.switchChannel (index)
        }
    },
    async deleteChannel (channel,index){
        if( index <= this.active ){
            this.$emit ( 'update-active' ,this.active-1)
        }
        this.userChannels.splice(index,1)

        if(this.user){
            await deleteUserChannel(channel.id)
        }else{
            setItem('user-channels' ,this.userChannels)
        }
    },
    switchChannel (index){
  this.$emit ('update-active' ,index)
        this.$emit('close')
    }
}

}
</script>

<style scoped lang ='less'>
.channel-edit{
    padding-top:54px ;
    .channel-title{
        font-size:16px ;
        color: #333333;
    }
    .grid-item{
        width: 80px;
        height: 43px;
        
        /deep/ .van-grid-item__content{
            background: #f4f5f6;
            .van-grid-item__text{
                font-size: 14px;
                color: #222;
                margin-top: 0;
            }
        }
        /deep/ .van-grid-item__icon {
            position: absolute;
            right: -5px;
            top: -5px;
            font-size: 20px;
            color: #ccc;
        }
    }
    .active{
        /deep/ .van-grid-item__text{
            color: red !important;
        }
    }
}
</style>
