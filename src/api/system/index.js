// 系统
import request from '../../utils/request'

// 获取 部门列表
export function getDepartment(params) {
  return request({
    url: '/xzyw/ywDepartmentInfo/getList',
    method: 'get',
    params
  })
}

// 添加 部门
export function addOrUpdateOne( params ) {
  return request.post('/xzyw/ywDepartmentInfo/addOrUpdateOne', 
  params
  )
}

// 获取 部门人员列表
export function getUserList(params) {
  return request({
    url: '/xzyw/ywAdminUser/getList',
    method: 'get',
    params
  })
}

// 添加 部门人员
export function addOrUpdateUser( params ) {
  return request.post('/xzyw/ywAdminUser/addOrUpdateOne', 
  params
  )
}
