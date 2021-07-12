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
    <van-tabs
      class="channels-tabs"
      v-model="active"
    >
      <van-tab
        :title="channels.name"
        :key="channels.id"
        v-for="channels in userChannels"
      >
        <!-- 文章列表 -->
        <article-list :channels="channels"></article-list>
      </van-tab>
    </van-tabs>
    <!-- 频道弹出层 -->
    <van-popup
      class="channels-edit"
      v-model="isChannelsEditShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      get-container="body"
    ></van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from '@/views/home/components/article-list'

export default {
  name: 'homeIndex',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      userChannels: [],
      value: null,
      isChannelsEditShow: false
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
  .channels-tabs {
    /deep/ .van-tab {
      border-right: 1px solid #e0e0e0;
      border-bottom: 1px solid #e0e0e0;
    }

    /deep/ .van-tabs__line {
      position: absolute;
      bottom: 0.6rem;
      width: 15px;
      background-color: rgb(255, 187, 199);
    }
  }
}
.channels-edit {
  height: 100%;
}
</style>
