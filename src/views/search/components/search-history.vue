<template>
  <div class="search-history">
      <van-cell title="搜索历史">
          <div v-if="isDeleteShow">
              <span @click="$emit('update-histories' ,[])">全部删除</span>
              &nbsp;  &nbsp;
              <span @click="isDeleteShow =false">完成</span>
          </div>
          <van-icon v-else name='delete' @click="isDeleteShow =true"></van-icon>
      </van-cell>
      <van-cell :title="history"
      v-for="(history,index) in SearchHistories"
      :key="index"
      @click="onDelete(history,index)">
      <van-icon name='close' v-show="isDeleteShow"></van-icon>
      </van-cell>
        
      

  </div>
</template>

<script>

export default {
    name:'SearchHistory',
  props: {
    SearchHistories:{
      type:Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow :false
    }
  },
  created () {},
  mounted () {},
  watch: {},
  computed: {},
  methods: {
    onDelete(history,index){
      if(this.isDeleteShow){
        this.SearchHistories.splice(index,1)
       
        return
      }
      this.$emit('search ', history)

    }
  },
  components: {},
}
</script>
<style lang="less" scoped>
</style>