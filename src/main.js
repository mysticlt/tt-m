import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入设置基准值创建
import 'amfe-flexible'
// 导入Vant移动端组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 自己的样式
import '@/styles/index.less'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
