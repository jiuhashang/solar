//用电
import React, { Component } from 'react'
import { Progress, Divider } from 'antd'
import './index.less'

export default class Electricity extends Component {
  render() {
    const { sumPower, dateSum, monSum, yearSum, totalSum } = this.props
    return (
      <div className='alll'>
        <div className='center'>
          <div className='left'>
            <Progress type="circle" percent={0} width={80} />
            <div className='fs12'>实时发电效率</div>
          </div>
          <div className='middle'>
            <p className='fs12'>实时总功率 kW</p>
            <p className='fs14'>{ sumPower }</p>
          </div>
          <div className='right'>
            <p className='fs12'>总装机容量 MWp</p>
            <p className='fs14'></p>
          </div>
        </div>
        <Divider />
        <div className='bottom'>
          <div className='day'>
            <p className='fs12'>当日发电量 MWh</p>
            <p className='fs14'>{ dateSum }</p>
          </div>
          <div className='month'>
            <p className='fs12'>当月发电量 MWh</p>
            <p className='fs14'>{ monSum }</p>
          </div>
          <div className='year'>
            <p className='fs12'>当年发电量 MWh</p>
            <p className='fs14'>{ yearSum }</p>
          </div>
          <div className='all'>
            <p className='fs12'>累计发电量 MWh</p>
            <p className='fs14'>{ totalSum }</p>
          </div>
        </div>
      </div>
    )
  }
}
