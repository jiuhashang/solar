import React, { Component } from 'react'
import { Col, Row } from 'antd'
import './index.less'
import { getDeviceStatusNum } from '../../../../api'

export default class State extends Component {
  state = {
    allConnectionOut: 0,
    allWorn: 0,
    connectionIn: 0,
    joinIn: 0,
    noWorn: 0,
    partConnectionOut: 0,
    partWorn: 0,
    totalNum: 0
  }
  
  getDeviceStatusNum = () => {
    getDeviceStatusNum().then(res => {
      // console.log(res)
      const { allConnectionOut, allWorn, connectionIn, joinIn, noWorn, partConnectionOut, partWorn, totalNum } = res.data
      this.setState({ allConnectionOut, allWorn, connectionIn, joinIn, noWorn, partConnectionOut, partWorn, totalNum })
    })
  }

  componentDidMount() {
    this.getDeviceStatusNum()
  }
  render() {
    const { allConnectionOut, joinIn, partConnectionOut, partWorn, totalNum } = this.state
    return (
      <div className='state'>
        <div className='top' style={{fontSize: 14, color: '#000', marginBottom: 10}}>电站状态概况</div>
        <div>
          <p>电站总数</p>
          <p>{totalNum}</p>
        </div>
        <Row gutter={[10, 10]}>
          <Col className="gutter-row" span={12}>
            <div style={{background: '#E8F4FF', padding: '20px 0 8px 10px'}}>
              <p>接入中电站</p>
              <p className='fs14'>{joinIn}</p>
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={{background: '#E6E6E6', padding: '20px 0 8px 10px'}}>
              <p>全部设备离线电站</p>
              <p className='fs14'>{allConnectionOut}</p>
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={{background: '#FEF5E9', padding: '20px 0 8px 10px'}}>
              <p>部分设备离线电站</p>
              <p className='fs14'>{partConnectionOut}</p>
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={{background: '#FBE6E9', padding: '20px 0 8px 10px'}}>
              <p>有报警电站</p>
              <p className='fs14'>{partWorn}</p>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
