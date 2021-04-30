<template>
  <div class="update-gender">
     <van-picker
     show-toolbar
     :columns="columns"
     @cancel="$emit('close')"
     :default-index =" defaultIndex"
          @confirm =" onConfirm"
          @change="onGenderChange"></van-picker>


  </div>
</template>

<script>
import {updateUserProfile} from "@/api/user"
export default {
    name:'UpdateGender',
  props: {
      value:{
          type:Number,
          required:true
      }
  },
  data () {
    return {
        columns:["男","女"],
        defaultIndex:this.value,
        
    }
  },
  created () {},
  mounted () {},
  watch: {},
  computed: {},
  methods: {
      onGenderChange(picker,value,index){
          this.defaultIndex =index

      },
       async onConfirm(){
         this.$toast.loading({
             message:'保存中',
             forbidclick:true
         })
        await updateUserProfile({
             gender:this.defaultIndex
         })
         this.$toast.success("保存成功")
         this.$emit('update-name',this.localName)
         this.$emit('close')
         
        
      }
  },
  components: {},
}
</script>
<style lang="less" scoped>
</style>