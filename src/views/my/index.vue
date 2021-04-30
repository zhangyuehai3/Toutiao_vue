<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell
        class="base-ifo"
        
        center
        :border="false"
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUser.photo"
        />
        <div class="name" slot="title">{{currentUser.name }}</div>
        <van-button class="upadate-btn" size="small" round
        to='/user/profile'>
          编辑资料</van-button
        >
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

<div v-else class="not-login">
  <div @click="$router.push({
    name:'login',
    query:{
      redirect:'/my'
    }
  })">
    <img class="mobile" src="./shouji.png">
  </div>
  <div>登录 /注册</div>
</div>


    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item class="van-grid-item1" icon="star-o" text="文字"></van-grid-item>
      <van-grid-item class="van-grid-item1" icon="browsing-history-o" text="文字"></van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link to="/"></van-cell>
    <van-cell class="mb-4" title="小智同学" to="/user/chat" is-link ></van-cell>
    <van-cell @click="onLogout"  class="logout-cell" title="退出登录"></van-cell>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getCurrentUser} from '@/api/user'
export default {
  name: "MyIndex",
  data () {
    return {
      currentUser:{}
    }
  },
  computed:{
    ...mapState(['user'])
  },
  watch:{},
  created(){
    this.loadCurrentUser()
  },
  methods:{
    async loadCurrentUser(){
    const {data} = await getCurrentUser()
    console.log(data);
    this.currentUser =data.data
    },
    onLogout(){
      this.$dialog.confirm({
        title:'退出提示',
        message:'确认退出码？'
      })
      .then (() =>{
this.$store.commit('setUser',null)
      })
      .catch (() =>{

      })
    }
  }
};
</script>

<style scoped lang='less'>
.my-container {
  .my-info {
    background: rgb(32, 164, 230) ;
    .base-ifo {
      box-sizing: border-box;
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      background: rgb(32, 164, 230);
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .upadate-btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    }
  .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
  }
.not-login{
  height: 180px;
  background: rgb(32, 164, 230) ;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .mobile{
    width: 66px;
    height: 66px;
    border-radius:50% ;
  }
  .text{
    font-size: 14px;
    color: #fff;
  }
}
  /deep/.nav-grid {
      .van-grid-item1{
        height: 70px;
        .toutiao {
          font-size: 22px;
        }
        .toutiao-shoucang {
          color: #eb5253;
        }
        .van-icon {
          caret-color: #ff9d1d;
        }
        .van-frid-item__text {
          font-size: 14px;
          color: #333333;
        }
      }
    }
  /deep/.van-grid-item__content {
      background: rgb(32, 164, 230);
    }
  .logout-cell{
    text-align: center;
    color: #d86262;
  }
  .mb-4{
    margin-bottom: 4px;
  }

  }

</style>