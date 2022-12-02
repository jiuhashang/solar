import React, { Component } from 'react'
import { Col, Row, Card } from 'antd'
import './index.less'

export default class Displacement extends Component {
  render() {
    const { totalSum } = this.props
    return (
      <Card style={{ height: 182, marginTop: 10 }}>
        <div style={{ fontSize: 14, color: '#000' }}>光伏电站减排量</div>
        <Row gutter={20} className='displacement'>
          <Col span={6}>
            <div className='left'>
              <span className='fs12'>节约标准煤（吨）</span>
              <span className='fs14'>{(totalSum / 1000 * 0.36).toFixed(2)}</span>
            </div>
          </Col>
          <Col span={6}>
            <div className='center'>
              <span className='fs12'>CO₂减排量（吨）</span>
              <span className='fs14'>{(totalSum / 1000 * 0.5).toFixed(2)}</span>
            </div>
          </Col>
          <Col span={6}>
            <div className='right'>
              <span className='fs12'>等效植树量（吨）</span>
              <span className='fs14'>{(totalSum / 1000 * 18.3).toFixed(2)}</span>
            </div>
          </Col>
        </Row>
      </Card>
    )
  }
}
