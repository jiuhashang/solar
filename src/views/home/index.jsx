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
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/power' component={Power} />
              <Route path='/device' component={Device} />
              <Route path='/alarm' component={Alarm} />
              <Route path='/report' component={Report} />
              <Route path='/contrast' component={Contrast} />
              <Route path='/record' component={Record} />
              <Route path='/account' component={Account} />
              <Route path='/permission' component={Permission} />
              <Route path='/push' component={Push} />
              <Redirect to='/dashboard' />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
