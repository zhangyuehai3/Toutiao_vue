<template>
  <div class="article-list" ref="article-list">
    <van-pull-refresh
      v-model="isRefresLoading"
      :success-duration="1500"
      :success-text="refreshSuccessText"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in articles"
          :key="index"
          :article ='article'
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import  ArticleItem from '@/components/article-item'
import {debounce} from 'lodash'
export default {
  name: "ArticleList",
  components: {
    ArticleItem
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,
      isRefresLoading: false,
      refreshSuccessText: "",
      scrollTop :0
    };
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      console.log("onLoad");
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1,
      });
      const { results } = data.data;
      this.articles.push(...results);

      this.loading = false;
      if (results.length) {
        this.timestamp = data.data.pre_timestamp;
      } else {
        this.finished = true;
      }
    },
    async onRefresh() {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1,
      });
      const { results } = data.data;

      this.articles.unshift(...results);
      this.isRefresLoading = false;

      this.refreshSuccessText = ` 更新了${results.length} 条数据`;
    },
  },
  mounted () {
    const ArticleList = this.$refs['article-list']
    ArticleList.onscroll =debounce(()=>{
     this.scrollTop =ArticleList.scrollTop
    },50)
  },
  activated () {
    this.$refs['article-list'].scrollTop =this.scrollTop
  }
};
</script>

<style scoped lang='less'>
.article-list {
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>