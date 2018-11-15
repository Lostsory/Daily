import axios from '@/config/axios'

/**
 * @api 登录
 */
export const login = (data) => axios({
  method: 'post',
  url: 'users/login',
  data
})

/**
 * @api 用户中心列表数据
 */
export const list = (params) => axios({
  method: 'get',
  url: 'list',
  params
})

/**
 * @api 用户中心列表数据添加
 */
export const userAdd = (data) => axios({
  method: 'post',
  url: 'add',
  data
})

/**
 * @api 用户中心列表数据删除
 */
export const userDelete = (params) => axios({
  method: 'delete',
  url: 'delete',
  params
})
