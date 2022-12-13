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