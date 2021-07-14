import axios from 'axios'
// 非组件模块获取 store
import store from '../store/'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  // 如果用户已登录，统一给接口设置 token 信息
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  console.log('请求拦截器成功')
  return config
}, function (error) {
  // Do something with request error
  console.log('请求拦截器失败')
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 状态码2xx会执行这里
  console.log('响应成功了', response)
  return response
}, async function (error) {
  console.log('响应失败了', error)
  if (error.response && error.response.status === 401) {
    const user = store.state.user

    // 如果有refresh_token，则请求获取新的 token
    try {
      const res = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 如果获取成功，则把新的 token 更新到容器中
      store.commit('setUser', {
        ...user,
        token: res.data.data.token // 最新获取的可用 token
      })
    } catch (error) {

    }
  }
  return Promise.reject(error)
})

export default request
