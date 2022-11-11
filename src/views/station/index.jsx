import {
  DashboardOutlined,
  AppstoreOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  UserOutlined,
  FileDoneOutlined
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
// import './index.less'
import Dashboard from './components/dashboard'
import Device from './components/device'
import Alarm from './components/alarm'
import Power from './components/power'
import Info from './components/power/info'
import Photo from './components/power/photo'
import Author from './components/author'
import Maintenance from './components/maintenance'

const { Content, Sider } = Layout
function getItem (label, key, icon, children, type) {
  return { key, icon, children, label, type }
}
const items = [
  getItem('数据概览', '/station/dashboard', <DashboardOutlined />),
  getItem('设备情况', '/station/device', <AppstoreOutlined />),
  getItem('报警情况', '/station/alarm', <ExclamationCircleOutlined />),
  getItem('电站', 'sub1', <HomeOutlined />,
    [
      getItem('电站信息', '/station/info'),
      getItem('电站照片', '/station/photo')
    ]
  ),
  getItem('授权情况', '/station/author', <UserOutlined />),
  getItem('维保记录', '/station/maintenance', <FileDoneOutlined />)
]

export default class Station extends Component {
  itemClick = ({ item, key, keyPath, domEvent }) => {
    this.props.history.push(key)
  }
  render () {
    const path = this.props.location.pathname
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[path]}
            defaultOpenKeys={['sub1']}
            items={items}
            style={{ height: '100%' }}
            onClick={this.itemClick}
          />
        </Sider>
        <Layout>
          <Content style={{ overflow: 'auto' }}>
            <Switch>
              <Route path='/station/dashboard' component={Dashboard} />
              <Route path='/station/device' component={Device} />
              <Route path='/station/alarm' component={Alarm} />
              <Route path='/station/power' component={Power} />
              <Route path='/station/info' component={Info} />
              <Route path='/station/photo' component={Photo} />
              <Route path='/station/author' component={Author} />
              <Route path='/station/maintenance' component={Maintenance} />
              <Redirect to='/station/dashboard' />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
