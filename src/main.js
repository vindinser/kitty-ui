// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/theme/theme-67da9a/index.css'

// 引入封装的二次封装的 axios
import api from './http'

// 语言切换组件
import i18n from './i18n'

Vue.use(ElementUI)

Vue.use(api)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
