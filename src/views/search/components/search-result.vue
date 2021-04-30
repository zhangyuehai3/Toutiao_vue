<template>
  <div class="search-result">
      <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
</van-list>
  </div>
</template>

<script>
import {getSearchResult} from '@/api/search'
export default {
  props: {
    searchText:{
      type:String,
      required:true
    }
  },
  data () {
    return {
    list: [],
      loading: false,
      finished: false,
      page:1,
      perPage:10


    }
  },
  created () {},
  mounted () {},
  watch: {},
  computed: {},
  methods: {
        async onLoad() {
          const {data} = await getSearchResult(
            {
              page:this.pape,
              per_pape: this.perPage,
              q :this.searchText
            }
          )
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
 const { results} =data.data
 this.list.push(...results)
 this.loading =false
 if( results.lenght){
   this.page++
 }
 else{
   this.finished =true
 }
      }
  },
  components: {},
}
</script>
<style lang="less" scoped>
.search-result{
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>