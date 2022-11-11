import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout  } from 'antd'
import Head from '../../components/head'
import Aside from '../../components/aside'

import Dashboard from '../dashboard'
import Power from '../monitoring/powerStation'
import Device from '../monitoring/device'
import Alarm from '../monitoring/alarmList'

import Report from '../analyse/stateAnaly'
import Contrast from '../analyse/contrast'

import Record from '../operation/record'

import Account from '../system/accountManage'
import Permission from '../system/rightsManage'
import Push from '../system/alarmPush'

const { Header, Sider, Content } = Layout

export default class Home extends Component {
  render() {
    return (
      <Layout className='layout'>
        <Header>
          <Head />
        </Header>
        <Layout>
          <Sider>
            <Aside />
          </Sider>
          <Content style={{height: '100%', overflow: 'auto'}}>
            <Switch>
              <Route path='/home/dashboard' component={Dashboard} />
              <Route path='/home/device' component={Device} />
              <Route path='/home/power' component={Power} />
              <Route path='/home/alarm' component={Alarm} />
              <Route path='/home/report' component={Report} />
              <Route path='/home/contrast' component={Contrast} />
              <Route path='/home/record' component={Record} />
              <Route path='/home/account' component={Account} />
              <Route path='/home/permission' component={Permission} />
              <Route path='/home/push' component={Push} />
              <Redirect to='/home/dashboard' />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
