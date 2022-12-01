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