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
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-cell-group>
        <!-- 手机号 -->
        <van-field
          v-model="user.mobile"
          left-icon="phone-o"
          placeholder="请输入手机号"
          :rules="formRules.mobile"
        />
        <!-- 验证码 -->
        <van-field
          v-model="user.code"
          clearable
          left-icon="warn-o"
          placeholder="请输入验证码"
          :rules="formRules.code"
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
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /\d{7}/, message: '验证码格式错误' }
        ]
      }
    }
  },
  methods: {
    async onLogin () {
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })

      try {
        const res = await login(this.user)
        console.log('登陆成功', res)
        this.$toast.success('登陆成功')
      } catch (err) {
        if (err.response.status === 400) {
          console.log('登陆失败', err)
          this.$toast.fail('登陆失败\n手机号或验证码错误')
        }
      }
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({ message: error.errors[0].message, position: 'top' })
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
