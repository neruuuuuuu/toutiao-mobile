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
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-cell-group>
        <!-- 手机号 -->
        <van-field
          v-model="user.mobile"
          left-icon="phone-o"
          name="mobile"
          placeholder="请输入手机号"
          :rules="formRules.mobile"
        />
        <!-- 验证码 -->
        <van-field
          v-model="user.code"
          clearable
          left-icon="warn-o"
          name="code"
          placeholder="请输入验证码"
          :rules="formRules.code"
        >
          <!-- 验证码行内按钮 -->
          <template #button>
            <!-- 倒计时 -->
            <van-count-down
              v-if="isCountDownShow"
              :time="60 * 1000"
              format="ss s"
              @finish="isCountDownShow=false"
            />
            <!-- 按钮 -->
            <van-button
              v-else
              class="send-btn"
              size="mini"
              round
              :disabled="isSendSmsDisabled"
              @click.prevent="onSendSms"
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
import { login, sendSms } from '@/api/user'

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
          { pattern: /\d{6}/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      isSendSmsDisabled: false
    }
  },
  methods: {
    async onLogin () {
      let success = false
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      setTimeout(() => {
        if (!success) {
          this.$toast({ message: '登录超时', position: 'top' })
        }
      }, 2000)
      try {
        const { data } = await login(this.user)
        console.log('登陆成功', data)
        this.$toast.success('登陆成功')
        this.$store.commit('setUser', data.data)
        this.$router.push('/my')
      } catch (error) {
        if (error.response.status === 400) {
          console.log('登陆失败', error)
          this.$toast.fail('登陆失败\n手机号或验证码错误')
        }
      } finally {
        success = true
      }
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({ message: error.errors[0].message, position: 'top' })
      }
    },
    async onSendSms () {
      // try {
      //   // 校验手机号码
      //   await this.$refs['login-form'].validate('mobile')
      //   this.isSendSmsDisabled = true

      //   // 验证通过，请求发送验证码
      //   await sendSms(this.user.mobile)
      //   this.isCountDownShow = true
      // } catch (error) {
      //   console.log(error.response)
      //   let message = ''
      //   if (error && error.response && error.response.status === 429) {
      //     message = '发送太频繁了，请稍后再试'
      //   } else if (error.name === 'mobile') {
      //     message = error.message
      //   } else {
      //     message = '发送失败，请稍后再试'
      //   }
      //   this.$toast({ message, position: 'top' })
      // }
      // this.isSendSmsDisabled = false
      //
      this.$refs['login-form'].validate('mobile').then(res => {
        sendSms(this.user.mobile).then(res1 => {
          this.isSendSmsDisabled = true
          this.isCountDownShow = true
        }).catch(error => {
          if (error && error.response && error.response.status === 429) {
            this.$toast({ message: '发送太频繁了，请稍后再试', position: 'top' })
          }
        }).finally(() => { this.isSendSmsDisabled = false })
      }).catch(res => {
        this.$toast({ message: res.message, position: 'top' })
      })
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
