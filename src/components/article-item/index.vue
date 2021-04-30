<template>
  <van-cell class="article-item"
  :to ="{
    name:'article',
    params:{
      articleId: article.art_id
    }

  }"
  >
    <div slot="title" class="title van-multi-ellipsis--l3">
      {{ article.title }}
    </div>
    <div slot="label" >

      <div v-if="article.cover.type === 3" 
      class="cover-wrap">
        <div
          class="cover-wrap-item"
          v-for="(img, k) in article.cover.images"
          :key="k"
        >
          <van-image :src="img" fit="cover" class="cover-item"/>
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.collect_count }}评论</span>
        <span>{{ article.pubdate ||time-chagndu  }}</span>
      </div>
    </div>
   <van-image
      class="reght-img"
      v-if="article.cover.type === 1"
      slot="default"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  created () {
  }
}
</script>

<style scoped lang="less">
.article-item {
  .title{
   font-size: 16px;
   color: #3a3a3a;
  }
 /deep/ .van-cell__value{
     flex: unset;
     width: 116px;
     height: 73px;
     margin-left: 12px;
 }
 .right-cover{
     width: 116px;
     height: 73px;
 }
 .cover-wrap{
     padding: 15px 0;
     display: flex;
     .cover-wrap-item{
         flex: 1;
         height: 73px;
         &:not(:last-child){
             padding-right:4px ;
         }
         .cover-item{
             width: 100%;
             height: 73px;
         }
     }
   .label-wrap{
       font-size: 11px;
       color: #b4b4b4;
   }
   .label-wrap span{
       margin-right: 2px;
   }
 }
  
}
</style>
