// 监控
import request from '../../utils/request'

// 获取电站列表
export function getStationCount(params) {
  return request({
    url: '/xzyw/ywStation/getStationCount',
    method: 'get',
    params
  })
}

// 获取电站详情
export function getStationById(params) {
  return request({
    url: '/xzyw/ywStation/getStationById',
    method: 'get',
    params
  })
}

// 获取电站电量统计
export function getDeviceView(params) {
  return request({
    url: '/xzyw/ywStationRunLog/getDeviceView',
    method: 'get',
    params
  })
}
