// 监控
import request from '../../utils/request'

// 获取电站列表
export function getStationList(params) {
  return request({
    url: '/xzyw/ywStation/getList',
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

// 获取省市区
export function getCityList(params) {
  return request({
    url: '/xzyw/ywCityInfo/getCityList',
    method: 'get',
    params
  })
}

// 获取设备列表 逆变器
export function getDeviceList(params) {
  return request({
    url: '/xzyw/ywStationDevice/getList',
    method: 'get',
    params
  })
}

// 获取设备详情 逆变器
export function getDeviceDetail(params) {
  return request({
    url: '/xzyw/ywStationDeviceDetail/getDeviceDetail',
    method: 'get',
    params
  })
}

// 获取设备详情 逆变器  历史数据
export function getDeviceView(params) {
  return request({
    url: '/xzyw/ywStationDeviceRunLog/getDeviceView',
    method: 'get',
    params
  })
}

// 获取报警列表
export function getWornList(params) {
  return request({
    url: '/xzyw/ywStationDeviceWornLog/getList',
    method: 'get',
    params
  })
}