import request from '../../utils/request'

// 设备列表 逆变器
export function getDeviceList(params) {
  return request({
    url: '/xzyw/ywStationDevice/getList',
    method: 'get',
    params
  })
}