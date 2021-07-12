<template>
  <div class="channels-edit">
    <!-- 我的频道 -->
    <van-cell
      center
      :border="false"
    >
      <div
        slot="title"
        class="cell-title"
      >我的频道</div>
      <van-button
        type="danger"
        size="small"
        plain
        round
        @click="isDeleteShow = !isDeleteShow"
      >{{isDeleteShow ? '完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        :icon=" isDeleteShow && index ? 'close' : '' "
        v-for="(channels,index) in myChannels"
        :key="index"
        :text="channels.name"
      />
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell
      center
      :border="false"
    >
      <div
        slot="title"
        class="cell-title"
      >推荐频道</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channels,index) in recommendChannels"
        :key="index"
        :text="channels.name"
        @click="onAdd(channels)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels'

export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      allChannels: [],
      isDeleteShow: false
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter(channels => {
        return !this.myChannels.find(myChannels => {
          return myChannels.id === channels.id
        })
      })
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    onAdd (channels) {
      this.myChannels.push(channels)
    }

  }
}
</script>

<style scoped lang="less">
.channels-edit {
  padding-top: 44px;
  .cell-title {
    font-size: 20px;
  }
  .van-grid-item {
    height: 40px;
  }
  /deep/ .van-grid-item__content {
    background-color: rgb(247, 247, 247);
    .van-grid-item__text {
      margin-top: 0;
      font-size: 16px;
    }
  }
  /deep/ .van-icon {
    position: absolute;
    top: -6px;
    right: -6px;
    font-size: 20px;
    color: #ee0a24;
  }
}
</style>
