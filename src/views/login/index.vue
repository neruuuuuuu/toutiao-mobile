<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="Login"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 输入表单 -->
    <van-cell-group>
      <!-- 手机号 -->
      <van-field
        v-model="user.mobile"
        left-icon="phone-o"
        placeholder="请输入手机号"
      />
      <!-- 验证码 -->
      <van-field
        v-model="user.code"
        clearable
        left-icon="warn-o"
        placeholder="请输入验证码"
      >
        <!-- 验证码行内按钮 -->
        <template #button>
          <van-button
            class="send-btn"
            size="mini"
            round
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-btn-warp">
      <van-button
        class="login-btn"
        type="info"
        block
      >登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  }
}
</script>

<style lang="less">
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-warp {
    padding: 26px 20px;
    .login-btn {
      background-color: #62b0ff;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
