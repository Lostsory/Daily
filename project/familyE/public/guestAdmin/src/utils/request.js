import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import router from '@/router'
import nprogress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

nprogress.configure({ showSpinner: false })
// 创建axios实例
const service = axios.create({
  baseURL: `${process.env.BASE_API}/api/`, // api的base_url
  timeout: 5000 // 请求超时时间
})

const msg = '服务器君开小差了，请稍后再试'

service.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
// request拦截器
service.interceptors.request.use(config => {
  nprogress.start() // 进度条开始
  // 添加城市编号
  const CITY_CODE = 2
  if (config.method === 'get' || config.method === 'delete') {
    config.params = {
      cityCode: CITY_CODE,
      ...config.params
    }
  } else {
    config.data = {
      cityCode: CITY_CODE,
      ...config.data
    }
  }
  config.headers['x-access-token'] = getToken()
  return config
}, error => {
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(res => {
  nprogress.done() // 进度条结束
  const RESPONSE_CODE = res.data.httpCode
  const RESPONSE_MSG = res.data.msg
  const SUCCESS_CODE = '200'
  /* const token = getToken()
  if (token) {
  } else {
    router.push('/login')
  } */
  if (res.config.method === 'get' && RESPONSE_CODE === SUCCESS_CODE) return res
  if (/^\/frontEndLayout/.test(router.currentRoute.fullPath)) return res
  if (RESPONSE_CODE === SUCCESS_CODE) {
    Message({
      message: RESPONSE_MSG,
      type: 'success'
    })
  } else {
    Message({
      message: RESPONSE_MSG,
      type: 'error'
    })
  }
  return res
}, err => {
  nprogress.done()
  Message.error(msg)
  return Promise.reject(err)
})

export default service
