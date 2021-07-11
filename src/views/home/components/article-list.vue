<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(article,index) in articles"
          :key="index"
          :article="article"
        ></article-item>

      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  components: { ArticleItem },
  name: 'ArticleList',
  props: {
    channels: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,
      isRefreshLoading: false
    }
  },
  methods: {
    // 加载文章列表数据方法
    async onLoad () {
      console.log('onLoad')
      const { data } = await getArticles({
        channel_id: this.channels.id,
        timestamp: this.timestamp || Date.now(), // 如果timestamp为null，使用Dat.now()
        with_top: 1
      })
      console.log('请求获取数据展示')
      console.log(data)
      // ...为扩展运算符
      const { results } = data.data
      this.articles.push(...results)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    // 刷新文章列表
    async onRefresh () {
      const { data } = await getArticles({
        channel_id: this.channels.id,
        timestamp: Date.now(), // 如果timestamp为null，使用Dat.now()
        with_top: 1
      })
      const { results } = data.data
      this.articles.unshift(...results)
      this.isRefreshLoading = false
    }
  }
}

</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow: auto;
}
</style>
