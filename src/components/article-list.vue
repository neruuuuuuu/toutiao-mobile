<template>
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article,index) in articles"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
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
      timestamp: null
    }
  },
  methods: {
    async onLoad () {
      console.log('onLoad')
      const { data } = await getArticles({
        channel_id: this.channels.id,
        timestamp: this.timestamp || Date.now(), // 如果timestamp为null，使用Dat.now()
        with_top: 1
      })
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
