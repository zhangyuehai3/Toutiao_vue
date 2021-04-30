<template>
  <div class="search-suggestion">
     <van-cell
     icon='search'
     
     v-for="(str,index) in suggestions"
     :key ='index'
     @click="$emit('search' ,str)">
      <div slot="title" v-html="highlight(str)"></div>
     </van-cell>
  </div>
</template>

<script>
import {getSearchSuggestions} from '@/api/search'
import {debounce} from 'lodash'
export default {
    name:'SearchSuggestion',
  props: {
    searchText:{
   type:String,
   required: true
    }
  },
  data () {
    return {
      suggestions:[]
    }
  },
  created () {},
  mounted () {},
  watch: {
    searchText:{
      handler:debounce( async function(){
        const {data} =await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      },1000),
      immediate:true
    }
  },
  computed: {},
  methods: {
    highlight(text){
      const str = `<span class="red">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, str)
      
    }
  },
  components: {},
}
</script>
<style lang="less" scoped>
</style>