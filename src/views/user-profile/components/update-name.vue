<template>
  <div class="update-name">
     <van-nav-bar
     title="修改昵称"
     left-text='取消'
    right-text ="完成"
     @click-left ="$emit('close')"
     @click-right="onConfirm"></van-nav-bar>

<div class="name-wrap">
<van-field
v-model=" localName"
rows ='2'
autosize
label ="留言"
type ="textarea"
maxlength="50"
placeholder ="请输入留言"
show-word-limit
></van-field>
</div>


  </div>
</template>

<script>
import {updateUserProfile} from "@/api/user"
export default {
    name:"UpdateName",
  props: {
      name:{
          type:String,
          required:true
      }
  },
  data () {
    return {
        localName: this.name
    }
  },
  created () {},
  mounted () {},
  watch: {},
  computed: {},
  methods: {
     async onConfirm(){
         this.$toast.loading({
             message:'保存中',
             forbidclick:true
         })
         try{
              await updateUserProfile({
             name:this.localName
         })
         this.$toast.success("保存成功")
         this.$emit('update-name',this.localName)
         this.$emit('close')
         }
         catch(err){
             if(err&& err.response && err.response.status ===409){
                 this.$toast.fail('昵称已存在')
             }
         }
        
      }
  },
  components: {},
}
</script>
<style lang="less" scoped>
.name-wrap{
    padding: 10px;
}
</style>