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
      <div
        class="van-tab-placeholder"
        slot="nav-right"
      ></div>
      <!-- 汉堡按钮 -->
      <div
        slot="nav-right"
        class="wap-nav-wrap"
        @click="isChannelsEditShow=true"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

    <!-- 频道弹出层 -->
    <van-popup
      class="channels-edit-popup"
      v-model="isChannelsEditShow"
      position="bottom"
      get-container="body"
    >
      <channels-edit
        :myChannels="userChannels"
        :active="active"
        @close="isChannelsEditShow = false,active = $event"
        @u-active="active = $event"
      ></channels-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from '@/views/home/components/article-list'
import ChannelsEdit from './components/channels-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelsEdit
  },
  data () {
    return {
      active: 0,
      userChannels: [],
      value: null,
      isChannelsEditShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        if (this.user) {
          const { data } = await getUserChannels()
          this.userChannels = data.data.channels
        } else {
          const localChannels = getItem('channnels')
          if (localChannels) {
            this.userChannels = localChannels
          } else {
            const { data } = await getUserChannels()
            this.userChannels = data.data.channels
          }
        }
      } catch (error) {
        console.log(error)
        this.$toast('数据获取失败')
      }
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
  /deep/ .van-tabs__nav {
    background-color: #ffeded;
  }
  .channels-tabs {
    /deep/ .van-tabs__nav--complete {
      padding-right: 0;
    }
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

    .van-tab-placeholder {
      width: 33px;
      flex-shrink: 0;
    }

    .wap-nav-wrap {
      position: fixed;
      right: 0;
      width: 33px;
      height: 43.2px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffeded;
      border-left: 1px solid #e0e0e0;
      border-bottom: 1px solid #e0e0e0;
      /deep/ .van-icon {
        font-size: 24px;
      }
    }
  }
}
.channels-edit-popup {
  height: 100%;
  /deep/ .van-popup__close-icon {
    color: #444;
  }
}
</style>
