import Layout from '../admin/layout/Layout'

export default [
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/homeSetting',
    children: [
      {
        path: '/admin/homeSetting',
        name: 'homeSetting',
        component: () => import('@/admin/home'),
        meta: {
          title: '首页管理'
        }
      },
      {
        path: '/admin/city',
        name: 'city',
        component: () => import('@/admin/city'),
        meta: {
          title: '城市管理',
          isAdmin: true
        }
      },
      {
        path: '/admin/agency',
        name: 'agency',
        component: () => import('@/admin/agency'),
        meta: {
          title: '账号管理'
        }
      },
      {
        path: '/admin/teacher',
        name: 'teacher',
        component: () => import('@/admin/teacher'),
        meta: {
          title: '教员管理'
        }
      },
      {
        path: '/admin/student',
        name: 'student',
        component: () => import('@/admin/student'),
        meta: {
          title: '学员管理'
        }
      },
      {
        path: '/admin/subject',
        name: 'subject',
        component: () => import('@/admin/subject'),
        meta: {
          title: '科目管理'
        }
      },
      {
        path: '/admin/subscribe',
        name: 'subscribe',
        component: () => import('@/admin/subscribe'),
        meta: {
          title: '预约管理'
        }
      },
      {
        path: '/admin/partners',
        name: 'adminPartners',
        component: () => import('@/admin/partners'),
        meta: {
          title: '合作机构',
          isAdmin: true
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/admin/login')
  }
]
