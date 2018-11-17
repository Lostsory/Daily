import Vue from 'vue'
import Router from 'vue-router'
import adminRouterMap from './adminRouter'
import frontEndRouterMap from './frontEnd'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

import notFound from '../views/notFound'

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...adminRouterMap,
    ...frontEndRouterMap,
    { path: '*', name: 'notFound', component: notFound }
  ]
})
