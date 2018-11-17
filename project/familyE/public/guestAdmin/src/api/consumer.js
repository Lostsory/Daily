import request from '@/utils/request'

// 酒水消费表格接口
export const consumers = (data) => {
  return request({
    url: 'guest/drinkconsumer/list',
    method: 'post',
    data
  })
}
// 酒水消费查询单个
export const drinkDetail = (data) => {
  return request({
    url: 'guest/drinkconsumer/detail',
    method: 'post',
    data
  })
}
// 酒水消费删除
export const drinkdelete = (data) => {
  return request({
    url: 'guest/drinkconsumer/delete',
    method: 'post',
    data
  })
}
// 酒水查询部门下拉
export const depSelect = (data) => {
  return request({
    url: 'guest/dep/getDepList',
    method: 'post',
    data
  })
}
// 酒水查询科室下拉
export const keshiSelect = (data) => {
  return request({
    url: 'guest/office/getOfficeByDep',
    method: 'post',
    data
  })
}
/*
客房消费
*/
// 表格
export const roomTable = (data) => {
  return request({
    url: 'guest/stayconsumer/list',
    method: 'post',
    data
  })
}
/*
客饭消费
*/
export const dinnerTable = (data) => {
  return request({
    url: 'guest/repast/list',
    method: 'post',
    data
  })
}
// 客饭消费删除
export const dinnerDelete = (data) => {
  return request({
    url: 'guest/repast/delete',
    method: 'post',
    data
  })
}
// 客饭消费导出
export const dinnerExport = (data) => {
  return request({
    url: 'guest/repast/repastConsumerExport',
    method: 'post',
    data
  })
}
// 客饭消费单个查询
export const dinnerDetail = (data) => {
  return request({
    url: 'guest/repast/detail',
    method: 'post',
    data
  })
}
// 客饭消费修改
export const dinnerEdit = (data) => {
  return request({
    url: 'guest/repast/update',
    method: 'post',
    data
  })
}
// 酒水消费导出
export const drinkExport = (data) => {
  return request({
    url: 'guest/drinkconsumer/drinkConsumerExport',
    method: 'post',
    data
  })
}
// 酒水添加下拉列表
export const drinkList = (data) => {
  return request({
    url: 'guest/drink/getdrinkList',
    method: 'post',
    data
  })
}
// 酒水添加
export const drinkAdd = (data) => {
  return request({
    url: 'guest/drinkconsumer/add',
    method: 'post',
    data
  })
}
// 修改酒水消费
export const drinkEdit = (data) => {
  return request({
    url: 'guest/drinkconsumer/update',
    method: 'post',
    data
  })
}
// 导出来访数据
export const visitExpor = (data) => {
  return request({
    url: 'guest/host/hostConsumerExport',
    method: 'post',
    data
  })
}
