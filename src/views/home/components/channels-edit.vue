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
        :class="{highlight : index === active }"
        :icon=" isDeleteShow && index ? 'close' : '' "
        v-for="(channels,index) in myChannels"
        :key="index"
        :text="channels.name"
        @click="onMyChannelsClick(channels,index)"
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
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channels'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
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
    ...mapState(['user']),

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
    async onAdd (channels) {
      this.myChannels.push(channels)
      if (this.user) {
        await addUserChannel([{ id: channels.id, seq: this.myChannels.length }])
      } else {
        setItem('my-channels', this.myChannels)
      }
    },
    onMyChannelsClick (channels, index) {
      if (this.isDeleteShow && index !== 0) {
        this.deleteChannels(channels, index)
      }
      if (!this.isDeleteShow) {
        this.switchChannels(index)
      }
    },
    async deleteChannels (channels, index) {
      console.log('deleteChannels')
      if (index <= this.active) {
        this.$emit('u-active', this.active - 1)
      }
      this.myChannels.splice(index, 1)

      if (this.user) {
        await deleteUserChannel(channels.id)
      } else {
        setItem('my-channels', this.myChannels)
      }
    },
    switchChannels (index) {
      console.log('switchChannels')
      this.$emit('close', index)
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
  .highlight {
    /deep/.van-grid-item__text {
      color: rgb(218, 60, 60) !important;
    }
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
