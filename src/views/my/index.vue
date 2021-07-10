<template>
  <div class="my-container">
    <van-cell-group
      v-if="user"
      class="my-info"
    >
      <!-- 第一行 -->
      <van-cell
        class="frist-row"
        center
        :border="false"
      >
        <van-image
          class="avatar"
          slot="icon"
          width="60"
          height="60"
          round
          fit="cover"
          :src="userInfo.photo"
        />
        <div
          class="name"
          slot="title"
        >{{userInfo.name}}</div>
        <van-button
          size="small"
          round
        >编辑</van-button>
      </van-cell>
      <!-- 第二行 -->
      <van-grid :border="false">
        <van-grid-item>
          <div slot="text">
            <div class="span">{{ userInfo.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">{{userInfo.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">{{userInfo.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">{{userInfo.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>

    </van-cell-group>
    <div
      v-else
      class="no-login"
    >
      <van-image
        @click="$router.push('/login')"
        class="avatar"
        slot="icon"
        width="60"
        height="60"
        round
        fit="cover"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />

      <div
        class="click-login"
        @click="$router.push('/login')"
      >点击登录</div>

    </div>
    <!-- 第三行 -->
    <van-grid
      :column-num="2"
      class="mb-4"
    >
      <van-grid-item
        icon="star-o"
        text="收藏"
      />
      <van-grid-item
        icon="eye-o"
        text="历史"
      />
    </van-grid>
    <!-- 第四行 -->
    <van-cell
      v-if="user"
      title="消息通知"
      is-link
      to=""
    />
    <van-cell
      class="mb-4"
      title="小小同学"
      is-link
      to=""
    />
    <!-- 第五行 -->
    <van-cell
      v-if="user"
      class="fifth-row"
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {} // 当前用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    // 加载用户信息
    async loadUserInfo () {
      const { data } = await getUserInfo()
      console.log(data)
      this.userInfo = data.data
    },
    // 退出登录方法
    onLogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '是否确认退出？'
      }).then(() => {
        this.$store.commit('setUser', null)
      }).catch(() => { })
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .my-info {
    background-color: rgb(250, 152, 177);

    .frist-row {
      // box-sizing: border-box;
      background-color: unset;
      padding: 35px 25px 10px 25px;
      font-size: 15px;
      .avatar {
        border: 1px solid white;
        margin-right: 10px;
        color: #fff;
      }
      .name {
        color: #fff;
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
      font-size: 15px;
      color: #fff;
    }
  }
  .no-login {
    height: 200px;
    background-color: rgb(250, 152, 177);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
  .fifth-row {
    text-align: center;
    color: rgb(216, 105, 72);
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
