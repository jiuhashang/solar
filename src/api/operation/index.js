// 运维
import request from '../../utils/request'

// 获取维保记录列表
export function getLog(params) {
  return request({
    url: '/xzyw/ywStationProtectLog/getList',
    method: 'get',
    params
  })
}

// 添加电站
export function addStation ( params ) {
  return request.post('/xzyw/ywStation/addOne', 
  params
  )
}

// 获取所有电站列表
export function getAllStationList(params) {
  return request({
    url: '/xzyw/ywStation/getAllList',
    method: 'get',
    params
  })
}

// 获取所有人员列表
export function getAllUserList(params) {
  return request({
    url: '/xzyw/ywAdminUser/getAllList',
    method: 'get',
    params
  })
}

// 获取对应电站所有设备列表
export function getAllDeviceList(params) {
  return request({
    url: '/xzyw/ywStationDevice/getListByStation',
    method: 'get',
    params
  })
}

// 添加/修改维保记录
export function addOrUpdateOne( params ) {
  return request.post('/xzyw/ywStationProtectLog/addOrUpdateOne', 
  params
  )
}

// 删除维保记录
export function deleteProtectLog(params) {
  return request({
    url: '/xzyw/ywStationProtectLog/deleteOne',
    method: 'get',
    params
  })
}