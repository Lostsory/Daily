import request from '@/utils/request'

// 开通城市查询接口
export const cityList = (params) => {
  return request({
    url: 'city/list',
    method: 'get',
    params
  })
}

// 开通城市接口
export const cityAdd = (data) => {
  return request({
    url: 'city/add',
    method: 'post',
    data
  })
}

// 城市删除接口
export const cityDelete = (params) => {
  return request({
    url: 'city/delete',
    method: 'delete',
    params
  })
}

/* ----------------------------------------------------------------------------------------------------------------------------- */

// 年级查询
export const gradeList = (params) => {
  return request({
    url: 'grade/list',
    method: 'get',
    params
  })
}

// 年级增加查询
export const gradeAdd = (data) => {
  return request({
    url: 'grade/add',
    method: 'post',
    data
  })
}

// 年级删除接口
export const gradeDelete = (params) => {
  return request({
    url: 'grade/delete',
    method: 'delete',
    params
  })
}

/* ----------------------------------------------------------------------------------------------------------------------------- */

// 科目查询
export const subjectList = (params) => {
  return request({
    url: 'subject/list',
    method: 'get',
    params
  })
}

// 科目增加查询
export const subjectAdd = (data) => {
  return request({
    url: 'subject/add',
    method: 'post',
    data
  })
}

// 科目删除接口
export const subjectDelete = (params) => {
  return request({
    url: 'subject/delete',
    method: 'delete',
    params
  })
}

/* ----------------------------------------------------------------------------------------------------------------------------- */

// 教员查询接口
export const teacherList = (params) => {
  return request({
    url: 'teacher/list',
    method: 'get',
    params
  })
}

// 教员增加接口
export const teacherAdd = (data) => {
  return request({
    url: 'teacher/add',
    method: 'post',
    data
  })
}

// 教员删除接口
export const teacherDelete = (params) => {
  return request({
    url: 'teacher/delete',
    method: 'delete',
    params
  })
}

// 教员审核接口
export const teacherCheck = (data) => {
  return request({
    url: 'teacher/check',
    method: 'post',
    data
  })
}

// 教员详情接口
export const teacherDetail = (params) => {
  return request({
    url: 'teacher/detail',
    method: 'get',
    params
  })
}

/* ----------------------------------------------------------------------------------------------------------------------------- */

// 学员查询接口
export const studentList = (params) => {
  return request({
    url: 'student/list',
    method: 'get',
    params
  })
}

// 学员增加接口
export const studentAdd = (data) => {
  return request({
    url: 'student/add',
    method: 'post',
    data
  })
}

// 学员删除接口
export const studentDelete = (params) => {
  return request({
    url: 'student/delete',
    method: 'delete',
    params
  })
}

/* ----------------------------------------------------------------------------------------------------------------------------- */

// 代理及负责人查询接口
export const responsiblePersonList = (params) => {
  return request({
    url: 'responsiblePerson/list',
    method: 'get',
    params
  })
}

// 代理及负责人增加接口
export const responsiblePersonAdd = (data) => {
  return request({
    url: 'responsiblePerson/add',
    method: 'post',
    data
  })
}

// 代理及负责人删除接口
export const responsiblePersonDelete = (params) => {
  return request({
    url: 'responsiblePerson/delete',
    method: 'delete',
    params
  })
}
