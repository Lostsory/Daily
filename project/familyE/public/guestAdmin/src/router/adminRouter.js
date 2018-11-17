import Layout from '../admin/layout/Layout'

export default [
  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: '/admin/city',
        name: 'city',
        component: () => import('@/admin/city/index'),
        meta: {
          title: '城市管理'
        }
      },
      {
        path: '/admin/agency',
        name: 'agency',
        component: () => import('@/admin/agency/index'),
        meta: {
          title: '代理管理'
        }
      },
      {
        path: '/admin/teacher',
        name: 'teacher',
        component: () => import('@/admin/teacher/index'),
        meta: {
          title: '教员管理'
        }
      },
      {
        path: '/admin/student',
        name: 'student',
        component: () => import('@/admin/student/index'),
        meta: {
          title: '学员管理'
        }
      },
      {
        path: '/admin/subject',
        name: 'subject',
        component: () => import('@/admin/subject/index'),
        meta: {
          title: '科目管理'
        }
      },
      {
        path: '/admin/home',
        name: 'home',
        component: () => import('@/admin/home/index'),
        meta: {
          title: '首页管理'
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/admin/login/index'),
    hidden: true
  }
]
