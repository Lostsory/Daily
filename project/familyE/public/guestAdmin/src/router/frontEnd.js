import Layout from '../admin/layout/Layout'

export default [
  {
    path: '/admin',
    component: Layout,
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/admin/login/index'),
    hidden: true
  },
  {
    path: '/city',
    name: 'city',
    component: () => import('@/admin/city/index'),
    meta: {
      title: '城市管理'
    }
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import('@/admin/teacher/index'),
    meta: {
      title: '教员管理'
    }
  },
  {
    path: '/student',
    name: 'student',
    component: () => import('@/admin/student/index'),
    meta: {
      title: '学员管理'
    }
  },
  {
    path: '/subject',
    name: 'subject',
    component: () => import('@/admin/subject/index'),
    meta: {
      title: '科目管理'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/admin/home/index'),
    meta: {
      title: '首页管理'
    }
  }
]
