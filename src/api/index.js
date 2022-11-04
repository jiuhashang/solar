import request from '../utils/request'

// 获取 省市区
export function getProvince(params) {
  return request({
    url: '/xzyw/ywCityInfo/getCityList',
    method: 'get',
    params
  })
}