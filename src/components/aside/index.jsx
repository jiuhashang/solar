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
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}
const items = [
  getItem('数据看板', '/dashboard', <DashboardOutlined />),
  getItem('监控', 'sub1', <CodeSandboxOutlined />, [
    getItem('电站列表', '/power'),
    getItem('设备列表', '/device'),
    getItem('报警列表', '/alarm')
  ]),
  getItem('分析', 'sub2', <BarChartOutlined />, [
    getItem('报表分析', '/report'),
    getItem('电站对比', '/contrast')
  ]),
  getItem('运维', 'sub3', <DeploymentUnitOutlined />, [
    getItem('维保记录', '/record')
  ]),
  getItem('系统', 'sub4', <SettingOutlined />, [
    getItem('账号管理', '/account'),
    getItem('权限管理', '/permission'),
    getItem('报警推送', '/push')
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