import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载全局样式
import './styles/index.less'

Vue.config.productionTip = false

// wepack打包启动入口
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
