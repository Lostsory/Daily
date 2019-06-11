import Vue from 'vue'
import Router from 'vue-router'
import adminRouterMap from './adminRouter'
import frontEndRouterMap from './frontEndRouter'
import { getToken } from '@/utils/auth'
import store from '@/store'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

import notFound from '@/components/notFound'

const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...adminRouterMap,
    ...frontEndRouterMap,
    { path: '*', name: 'notFound', component: notFound }
  ]
})

const admin = store.state.user.userInfo.identity === '0'
router.beforeEach((to, from, next) => {
  const token = getToken()
  const isAdmin = /^\/admin/.test(to.path)
  // 是否为后台管理页面
  if (isAdmin) {
    // 是否登录
    if (token) {
      if (to.meta.isAdmin) {
        if (admin) {
          next()
        } else {
          next({ name: 'notFound' })
        }
      } else {
        next()
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
