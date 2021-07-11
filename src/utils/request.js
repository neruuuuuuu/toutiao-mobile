import axios from 'axios'
// 非组件模块获取 store
import store from '../store/'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  // 如果用户已登录，统一给接口设置 token 信息
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  console.log('拦截器成功')
  return config
}, function (error) {
  // Do something with request error
  console.log('拦截器失败')
  return Promise.reject(error)
})

export default request
