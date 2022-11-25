// 数据看板
import React, { Component } from 'react'
import { Row, Col, Card } from 'antd'
import qs from 'qs' 
import { getStationById, getStationCount } from '../../../../api/station'
import Info from './info'
import Count from './count'
import Chart from './chart'

import './index.less'

export default class Dashboard extends Component {
  state = {
    details: {}, // 电站详情
    electricity: {}, // 实时发电数据
  }
  componentDidMount () {
    this.getDetail()
    this.getStationCount(this.stationId)
  }
  // 获取电站详情
  getDetail = () => {
    const stationId = this.stationId
    getStationById({ stationId }).then(res => {
      // console.log(res)
      this.setState({
        details: res.data
      })
    })
  }
  // 获取实时发电数据
  getStationCount = ( stationId ) => {
    getStationCount({ stationId }).then(res => {
      // console.log(res)
      this.setState({
        electricity: res.data
      })
    })
  }
  render() {
    if(window.sessionStorage.getItem('stationId')) {
      this.stationId = window.sessionStorage.getItem('stationId')
    } else {
      this.stationId = qs.parse(this.props.location.search.slice(1)).stationId
      window.sessionStorage.setItem('stationId', this.stationId)
    }
    const { details, electricity } = this.state
    return (
      <div className='dash'>
        <div className='head'>
          <div className='left'>
            <div className='top'>
              <span className='title'>{ details.stationName }</span>
              <span className='num'>ID{ details.platformStationId }</span>
            </div>
            <div className='bottom'>
              <span>通讯正常</span>
              <span style={{ margin: '0 30px' }}>无报警</span>
              <span>更新于 2022-05-20 13:52:11</span>
            </div>
          </div>
          <div className='right'>
            <span>天气板块</span>
          </div>
        </div>
        <div className='content'>
          <Row gutter={20}>
            <Col span={8}>
              <Info locationAddress={details.locationAddress} stationType={details.stationType} systemType={details.systemType} platformType={details.platformType} />
            </Col>
            <Col span={16}>
              <Count electricity={electricity} />
            </Col>
          </Row>
          <Chart stationId={this.stationId} />
          <Row gutter={20}>
            <Col span={12}>
              <Card className='bl'>
                <h3>系统概要</h3>
              </Card>
            </Col>
            <Col span={12}>
              <Card className='br'>
                <h3>系统概要</h3>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
