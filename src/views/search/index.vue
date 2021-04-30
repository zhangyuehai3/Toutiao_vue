<template>
  <div class="search-container">
    <form action="/">
      <van-search 
      v-model="searchText"
      placeholder ='请输入搜索关键词'
      show-action
      @search ='onSearch(searchText)'
      @cancel ='$router.back()'
      @focus="isResultShow =false"
      >

      </van-search>
    </form>
 <search-result
  v-if="isResultShow"
  :search-text ='searchText'
  >
       
   </search-result>



    <search-suggestion
     v-else-if="searchText"
    :search-text ='searchText'
    @search ="onSearch"
    >

    </search-suggestion>
   <search-history 
   v-else
   :SearchHistories ='SearchHistories'
   @search ='onSearch'
   @update-histories ='searchHistories =$event'
   >

   </search-history>
  



  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import {setItem,getItem} from '@/utils/storage'

import { mapState} from 'vuex'
export default {
    name :'searchIndex',
  props: {


  },
  data () {
    return {
        searchText:'',
        isResultShow:false,
        SearchHistories:getItem('search-histories') || []
    }
  },
 created () {
  
  },
  mounted () {},
  watch: {
    searchHistories(){
      setItem( 'search-histories' , this.searchHistories)
    }
  },
  computed: {
  
    },
  methods: {
    onSearch( searchText){

      this.searchText =searchText
    const index =this.SearchHistories.indexOf(searchText)
    if(index !==-1){
  this.SearchHistories.splice(index,1)
}

      this.SearchHistories.unshift(searchText)
      this.isResultShow =true
    },
   
  


    
  },
  components: {
      SearchSuggestion,
      SearchHistory,
      SearchResult
      },
}
</script>
<style lang="less" scoped>
</style>