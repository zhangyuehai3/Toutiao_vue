<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录|注册"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 登入表单 -->
    <van-form
    ref=" login-form" 
    @submit="onLogin"
    :show-error = "false"
    :show-error-message="false"
    @failed ="onFailed">
      <van-field
        v-model="user.mobile"
        center
        name='mobile'
        left-icon="smile-o"
        placeholder="请输入手机号"
        :rules="formrules.mobile"
      />
      <van-field
        v-model="user.code"
        center
        clearable
        left-icon="music-o"
        placeholder="请输入验证码"
        :rules ='formrules.code'

      >
        <template #button>
          <van-count-down
          name ='code'
          v-if="isCountDownShow"
          :time ='1000* 5'
          format ="ss s"
          @finish ="isCountDownShow =false"/>

          <van-button v-else @click.prevent="onSandSms" class="send-btn" size="mini" :loading='isSendSmsLoading' round>发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from "@/api/user";
import { Toast } from "vant";
import {sendSms } from '@/api/user'

export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      formrules:{
        mobile:[ 
           { required:true, message: '请输入正确内容' },
        { pattern:/^1[3|5|7|8|9]\d{9}$/,message:'手机号格式错误'}],     
        code:[
             { required:true, message: '请输入正确内容' },
            { pattern:/^\d{6}$/,message:'验证码错误'}],
      },
      isCountDownShow:false,
      isSendSmsLoading:false
      
      
      
      
    };
  },

  methods: {
    async onLogin() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const {data} = await login(this.user);
         console.log(data);
        Toast.success("成功登录");
         this.$store.commit('setUser', data.data)
         this.$store.commit('removeCachePage',  'LayoutIndex')
        this.$router.push( this.$route.query.redirect || '/')
      } catch (err) {
        console.log("登录失败", err);
        Toast.fail("登录失败");
      }
    },
    onFailed (error) {
      console.log(error);
      if(error.errors[0]){
        this.$toast ({
          message:error.errors[0].message,
          position:'top'
        })
      }
    },
    async onSandSms(){
      try{
        var s =await this.$refs['login-form'].validate('mobile')
        
        this.isSendSmsLoading ='true'
        const res = await sendSms(this.user.mobile)
        console.log(res);
        this.isCountDownShow = true
      }catch(err){
        let message =''
        if(err && err.response && err.response.status ==429){
          message ='发送太频繁，请稍后重试'

          
        } else if(err.name ==='mobile'){
          message = err.message
console.log(err.message);
        }else{
          message = '发送失败，请稍后重试'
        }
       

        this.$toast({
          message:err.message,
          position:'top'
        })
      }
       this.isCountDownShow = false
    }

  },
};
</script>

<style scoped lang='less'>

.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>