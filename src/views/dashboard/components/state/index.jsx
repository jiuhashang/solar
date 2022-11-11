import React, { Component } from 'react'
import { Col, Row } from 'antd'
import './index.less'

const style = {
  background: '#f8f8f9',
  padding: '20px 0 8px 10px',
};
export default class State extends Component {
  render() {
    return (
      <div className='state'>
        <div className='top' style={{fontSize: 14, color: '#000', marginBottom: 50}}>电站状态概况</div>
        <Row gutter={[10, 10]}>
          <Col className="gutter-row" span={12}>
            <div style={style}>
              <p>电站总数</p>
              <p className='fs14'>8</p>
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={style}>
              <p>全部设备离线电站</p>
              <p className='fs14'>6</p>
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={style}>
              <p>部分设备离线电站</p>
              <p className='fs14'>8</p>
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={style}>
              <p>有报警电站</p>
              <p className='fs14'>6</p>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
