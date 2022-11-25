import request from '../utils/request'

// 获取 省市区
export function getProvince(params) {
  return request({
    url: '/xzyw/ywCityInfo/getCityList',
    method: 'get',
    params
  })
}

// 获取 电站状态概况
export function getDeviceStatusNum(params) {
  return request({
    url: '/xzyw/ywStation/getDeviceStatusNum',
    method: 'get',
    params
  })
}

// 获取 整体历史数据
export function getAllStationCount(params) {
  return request({
    url: '/xzyw/ywStationRunLog/getAllStationCount',
    method: 'get',
    params
  })
}