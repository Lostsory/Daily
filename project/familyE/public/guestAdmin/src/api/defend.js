import request from '@/utils/request'

// 酒水列表查询接口
export const drinkList = (data) => {
  return request({
    url: 'guest/drink/list',
    method: 'post',
    data
  })
}

// 酒水实体查询接口
export const drinkDetail = (data) => {
  return request({
    url: 'guest/drink/detail',
    method: 'post',
    data
  })
}

// 酒水信息修改接口
export const drinkUpdate = (data) => {
  return request({
    url: 'guest/drink/update',
    method: 'post',
    data
  })
}

// 酒水信息添加接口
export const drinkAdd = (data) => {
  return request({
    url: 'guest/drink/add',
    method: 'post',
    data
  })
}

// 酒水信息添加接口
export const drinkDelete = (data) => {
  return request({
    url: 'guest/drink/delete',
    method: 'post',
    data
  })
}

// 查询酒店列表接口
export const hotelList = (data) => {
  return request({
    url: 'guest/stay/list',
    method: 'post',
    data
  })
}

// 酒店信息添加接口
export const hotelAdd = (data) => {
  return request({
    url: 'guest/stay/add',
    method: 'post',
    data
  })
}

// 修改酒店信息接口
export const hotelUpdate = (data) => {
  return request({
    url: 'guest/stay/update',
    method: 'post',
    data
  })
}

// 酒店信息删除接口
export const hotelDelete = (data) => {
  return request({
    url: 'guest/stay/delete',
    method: 'post',
    data
  })
}

// 酒店信息单个查询接口
export const hotelDetail = (data) => {
  return request({
    url: 'guest/stay/detail',
    method: 'post',
    data
  })
}

// 部门信息列表接口
export const depList = (data) => {
  return request({
    url: 'guest/dep/list',
    method: 'post',
    data
  })
}

// 部门信息添加接口
export const depAdd = (data) => {
  return request({
    url: 'guest/dep/add',
    method: 'post',
    data
  })
}

// 部门信息修改接口
export const depUpdate = (data) => {
  return request({
    url: 'guest/dep/update',
    method: 'post',
    data
  })
}

// 部门信息删除接口
export const depDelete = (data) => {
  return request({
    url: 'guest/dep/delete',
    method: 'post',
    data
  })
}

// 部门信息单个查询接口
export const depDetail = (data) => {
  return request({
    url: 'guest/dep/detail',
    method: 'post',
    data
  })
}

// 科室信息列表接口
export const officeList = (data) => {
  return request({
    url: 'guest/office/list',
    method: 'post',
    data
  })
}

// 科室信息添加接口
export const officeAdd = (data) => {
  return request({
    url: 'guest/office/add',
    method: 'post',
    data
  })
}

// 科室信息修改接口
export const officeUpdate = (data) => {
  return request({
    url: 'guest/office/update',
    method: 'post',
    data
  })
}

// 科室信息删除接口
export const officeDelete = (data) => {
  return request({
    url: 'guest/office/delete',
    method: 'post',
    data
  })
}

// 科室信息单个查询接口
export const officeDetail = (data) => {
  return request({
    url: 'guest/office/detail',
    method: 'post',
    data
  })
}

// 级别信息列表接口
export const rankList = (data) => {
  return request({
    url: 'guest/rank/list',
    method: 'post',
    data
  })
}

// 级别信息添加接口
export const rankAdd = (data) => {
  return request({
    url: 'guest/rank/add',
    method: 'post',
    data
  })
}

// 级别信息修改接口
export const rankUpdate = (data) => {
  return request({
    url: 'guest/rank/update',
    method: 'post',
    data
  })
}

// 级别信息删除接口
export const rankDelete = (data) => {
  return request({
    url: 'guest/rank/delete',
    method: 'post',
    data
  })
}

// 级别信息单个查询接口
export const rankDetail = (data) => {
  return request({
    url: 'guest/rank/detail',
    method: 'post',
    data
  })
}

// 部门下拉列表接口
export const getDepList = (data) => {
  return request({
    url: 'guest/dep/getDepList',
    method: 'post',
    data
  })
}

// 获取科室下拉列表接口
export const getOfficeByDep = (data) => {
  return request({
    url: 'guest/office/getOfficeByDep',
    method: 'post',
    data
  })
}

// 级别下拉列表接口
export const getRankList = (data) => {
  return request({
    url: 'guest/rank/getRankList',
    method: 'post',
    data
  })
}

