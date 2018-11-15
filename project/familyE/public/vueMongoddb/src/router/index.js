import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    },
    {
      path: '/layout',
      name: 'layout',
      redirect: 'list',
      component: () => import('@/components/layout'),
      children: [
        {
          path: '/list',
          name: 'list',
          component: () => import('@/views/list')
        }
      ]
    }
  ]
})
