<template>
  <div class="layout-container">
    <router-view></router-view>

    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="chat-o" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="play-circle-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less">
</style>
