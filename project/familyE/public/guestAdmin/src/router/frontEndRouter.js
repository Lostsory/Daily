import frontEndLayout from '@/frontEnd/layout/index'
export default [
  {
    path: '/',
    redirect: '/frontEndLayout'
  },
  {
    path: '/frontEndLayout',
    component: frontEndLayout,
    redirect: '/frontEndLayout/home',
    children: [
      {
        path: '/frontEndLayout/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/frontEnd/home')
      },
      {
        path: '/frontEndLayout/teachers',
        name: 'teachers',
        component: () => import(/* webpackChunkName: "teachers" */ '@/frontEnd/teachers')
      },
      {
        path: '/frontEndLayout/students',
        name: 'students',
        component: () => import(/* webpackChunkName: "students" */ '@/frontEnd/students')
      },
      {
        path: '/frontEndLayout/partners',
        name: 'partners',
        component: () => import(/* webpackChunkName: "partners" */ '@/frontEnd/partners')
      },
      {
        path: '/frontEndLayout/pleaseTeach',
        name: 'pleaseTeach',
        component: () => import(/* webpackChunkName: "pleaseTeach" */ '@/frontEnd/pleaseTeach')
      }
    ]
  }
]
