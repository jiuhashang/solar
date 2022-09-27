import React, { Component } from 'react'
import { Col, Row, Card } from 'antd'
import './index.less'
import Profile from './components/profile'
import History from './components/history'
import State from './components/state'
import Map from './components/map'
import Hour from './components/hour'
import Power from './components/power'

export default class Dashboard extends Component {
  render() {
    return (
      <div className='dashboard'>
        <h2>数据看板</h2>
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Card style={{ height: 340 }}>
              <Profile />
            </Card>
          </Col>
          <Col className="gutter-row" span={12}>
            <Card style={{ height: 340 }}>
              <History />
            </Card>
          </Col>
          <Col className="gutter-row" span={12}>
            <Card style={{ height: 340 }}>
              <State />
            </Card>
          </Col>
          <Col className="gutter-row" span={12}>
            <Card style={{ height: 340 }}>
              <Map />
            </Card>
          </Col>
          <Col className="gutter-row" span={12}>
            <Card style={{ height: 340 }}>
              <Hour />
            </Card>
          </Col>
          <Col className="gutter-row" span={12}>
            <Card style={{ height: 340 }}>
              <Power />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
