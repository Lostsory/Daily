import request from '@/utils/request'

// 来访记录查询接口
export const hostList = (data) => {
  return request({
    url: 'guest/host/list',
    method: 'post',
    data
  })
}

// 来访记录实体查询接口
export const hostDetail = (data) => {
  return request({
    url: 'guest/host/detail',
    method: 'post',
    data
  })
}

// 来访记录修改接口
export const hostUpdate = (data) => {
  return request({
    url: 'guest/host/update',
    method: 'post',
    data
  })
}

// 来访记录添加接口
export const hostAdd = (data) => {
  return request({
    url: 'guest/host/add',
    method: 'post',
    data
  })
}

// 来访记录添加接口
export const hostDelete = (data) => {
  return request({
    url: 'guest/host/delete',
    method: 'post',
    data
  })
}

// 新增酒水消费接口
export const drinkAdd = (data) => {
  return request({
    url: 'guest/drinkconsumer/add',
    method: 'post',
    data
  })
}

// 酒水下拉接口
export const drinkDrop = (data) => {
  return request({
    url: 'guest/drink/getdrinkList',
    method: 'post',
    data
  })
}

// 新增客饭消费接口
export const mealAdd = (data) => {
  return request({
    url: 'guest/repast/add',
    method: 'post',
    data
  })
}

// 新增客房消费接口
export const stayAdd = (data) => {
  return request({
    url: 'guest/stayconsumer/add',
    method: 'post',
    data
  })
}

// 酒店下拉接口
export const hotelDrop = (data) => {
  return request({
    url: 'guest/stay/getStayList',
    method: 'post',
    data
  })
}

// 客房消费查询接口
export const stayConList = (data) => {
  return request({
    url: 'guest/stayconsumer/list',
    method: 'post',
    data
  })
}

// 客房消费实体查询接口
export const stayConDetail = (data) => {
  return request({
    url: 'guest/stayconsumer/detail',
    method: 'post',
    data
  })
}

// 客房消费修改接口
export const stayConUpdate = (data) => {
  return request({
    url: 'guest/stayconsumer/update',
    method: 'post',
    data
  })
}

// 客房消费添加接口
export const stayConAdd = (data) => {
  return request({
    url: 'guest/stayconsumer/add',
    method: 'post',
    data
  })
}

// 客房消费删除接口
export const stayConDelete = (data) => {
  return request({
    url: 'guest/stayconsumer/delete',
    method: 'post',
    data
  })
}

// 客房消费数据导出接口
export const stayExport = (data) => {
  return request({
    url: 'guest/stayconsumer/stayConsumerExport',
    method: 'post',
    data
  })
}
