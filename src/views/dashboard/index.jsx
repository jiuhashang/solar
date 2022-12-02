import React, { Component } from 'react'
import { Col, Row, Card } from 'antd'
import './index.less'
import Profile from './components/profile'
import History from './components/history'
import State from './components/state'
import Map from './components/map'
import Hour from './components/hour'
import Power from './components/power'
import Displacement from './components/displacement'

export default class Dashboard extends Component {
  state = {
    totalSum: 0
  }
  getTotalSum = (totalSum) => {
    this.setState({
      totalSum
    })
  }
  render() {
    return (
      <div className='dashboard'>
        <div style={{ fontSize: 18, marginBottom: 16 , fontWeight: 'bold' }}>数据看板</div>
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Card style={{ height: 340 }}>
              <Profile getTotalSum={this.getTotalSum} />
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
            <div style={{ height: 340 }}>
              <Map />
            </div>
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
        <Displacement totalSum={this.state.totalSum} />
      </div>
    )
  }
}
