import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import AmazeVue from 'amaze-vue'
import 'amaze-vue/dist/amaze-vue.css'

import '@/styles/index.scss' // global css
import '@/assets/scss/common.scss'

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon

Vue.use(ElementUI)
Vue.use(AmazeVue)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
