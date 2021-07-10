<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="home-nav-bar">
      <template #title>
        <van-search
          v-model="value"
          shape="round"
          background="rgb(255, 187, 199)"
          placeholder="请输入搜索关键词"
        />
      </template>
    </van-nav-bar>
    <!-- 频道 -->
    <van-tabs v-model="active">
      <van-tab
        :title="channels.name"
        :key="channels.id"
        v-for="channels in userChannels"
      >
        <!-- 文章列表 -->
        <article-list :channels="channels"></article-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from '@/components/article-list'

export default {
  name: 'homeIndex',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      userChannels: [],
      value: null
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      this.userChannels = data.data.channels
      console.log(data)
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  .home-nav-bar {
    background: rgb(255, 187, 199);
    /deep/ .van-search {
      height: 32px;
    }
  }
}
</style>
