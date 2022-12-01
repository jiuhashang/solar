import {
  DashboardOutlined,
  CodeSandboxOutlined,
  BarChartOutlined,
  DeploymentUnitOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

function getItem(label, key, icon, children, type) {
  return { key, icon, children, label, type }
}
const items = [
  getItem('数据看板', '/home/dashboard', <DashboardOutlined />),
  getItem('监控', 'sub1', <CodeSandboxOutlined />, [
    getItem('电站列表', '/home/power'),
    getItem('设备列表', '/home/device'),
    getItem('告警列表', '/home/alarm')
  ]),
  getItem('分析', 'sub2', <BarChartOutlined />, [
    getItem('报表分析', '/home/report'),
    getItem('电站对比', '/home/contrast')
  ]),
  getItem('运维', 'sub3', <DeploymentUnitOutlined />, [
    getItem('维保记录', '/home/record')
  ]),
  getItem('系统', 'sub4', <SettingOutlined />, [
    getItem('部门与成员', '/home/account'),
    getItem('权限管理', '/home/permission'),
    getItem('报警推送', '/home/push')
  ])
]
class Aside extends Component {
  itemClick = ({ item, key, keyPath, domEvent }) => {
    this.props.history.push(key)
  }
  render() {
    const path = this.props.location.pathname
    return (
      <Menu
        selectedKeys={[path]}
        defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}
        mode="inline"
        theme="light"
        items={items}
        onClick={this.itemClick}
      />
    )
  }
}

export default withRouter(Aside)