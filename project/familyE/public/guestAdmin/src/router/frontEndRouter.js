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
        path: '/frontEndLayout/teacherDetail',
        name: 'teacherDetail',
        component: () => import(/* webpackChunkName: "teacherDetail" */ '@/frontEnd/teachers/teacherDetail')
      },
      {
        path: '/frontEndLayout/students',
        name: 'students',
        component: () => import(/* webpackChunkName: "students" */ '@/frontEnd/students')
      },
      {
        path: '/frontEndLayout/studentDetail',
        name: 'studentDetail',
        component: () => import(/* webpackChunkName: "studentDetail" */ '@/frontEnd/students/studentDetail')
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
      },
      {
        path: '/frontEndLayout/doTeach',
        name: 'doTeach',
        component: () => import(/* webpackChunkName: "doTeach" */ '@/frontEnd/doTeach')
      }
    ]
  }
]
