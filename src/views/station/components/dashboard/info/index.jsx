import React, { Component } from 'react'
import { Card } from 'antd'
import './index.less'

export default class Info extends Component {
  render() {
    const { locationAddress, stationType, systemType, platformType } = this.props
    return (
      <Card
        style={{ width: '100%', height: 339 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            style={{ width: '100%', height: 170 }}
          />
        }
      >
        <div className='satinfo'>
          <div className='fs'>
            <p className='fs12'>地址</p>
            <p className='fs14'>{locationAddress}</p>
          </div>
          <div className='fs'>
            <p className='fs12'>电站类型</p>
            <p className='fs14'>{stationType}</p>
          </div>
          <div className='fs'>
            <p className='fs12'>系统类型</p>
            <p className='fs14'>{systemType}</p>
          </div>
          <div className='fs'>
            <p className='fs12'>接入类型</p>
            <p className='fs14'>{ platformType === 1 ? '小麦' : '乐福' }</p>
          </div>
        </div>
      </Card>
    )
  }
}
