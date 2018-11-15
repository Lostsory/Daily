/**
 *
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import {baseUrl} from './env'
import Element from 'element-ui'
import router from '@/router'

import nprogress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
nprogress.configure({ showSpinner: false })// NProgress Configuration

const _RESPONSE_SUCCESS_CODE = '0'
let msg = '服务器君开小差了，请稍后再试'

const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 10000 // request timeout
})
// axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'

// HTTPrequest拦截
service.interceptors.request.use(config => {
  nprogress.start() // 进度条开始
  config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  config.headers['x-access-token'] = window.localStorage.getItem('token')
  console.log(typeof config.headers['x-access-token'])
  return config
}, error => {
  return Promise.reject(error)
})

// HTTPresponse拦截
service.interceptors.response.use(res => {
  nprogress.done() // 进度条结束
  console.log(res)
  if (res.data.httpCode === _RESPONSE_SUCCESS_CODE) {
    if (res.config.method !== 'get') {
      Element.Message({
        message: res.data.msg,
        type: 'success'
      })
    }
  } else {
    if (res.data.httpCode === '401') {
      router.push({path: '/login'})
    }
    Element.Message({
      message: res.data.msg,
      type: 'error'
    })
  }
  return res
}, (error) => {
  nprogress.done()
  Element.Message.error(msg)
  return Promise.reject(error)
})
export default service
