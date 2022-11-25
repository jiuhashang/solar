//用电
import React, { Component } from 'react'
import { Progress, Divider } from 'antd'
import './index.less'

export default class Electricity extends Component {
  ThousandAndDecimal = (num) => {
    if(num) {
      return num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    } else {
      return '0.00'
    }
  }
  render() {
    console.log(this.props)
    const { dateSum, electricityScale, monSum, sumPower, totalInstall, totalSum, yearSum } = this.props
    return (
      <div className='alll'>
        <div className='center'>
          <div className='left'>
            <Progress type="circle" percent={electricityScale} width={80} />
            <div className='fs12' style={{ marginTop: 5 }}>实时发电效率</div>
          </div>
          <div className='middle'>
            <p className='fs12'>实时总功率 kW</p>
            <p className='fs14'>{sumPower}</p>
          </div>
          <div className='right'>
            <p className='fs12'>总装机容量 kWp</p>
            <p className='fs14'>{totalInstall}</p>
          </div>
        </div>
        <Divider />
        <div className='bottom'>
          <div className='day'>
            <p className='fs12'>当日发电量 kWh</p>
            <p className='fs14'>{ dateSum }</p>
          </div>
          <div className='month'>
            <p className='fs12'>当月发电量 kWh</p>
            <p className='fs14'>{ monSum }</p>
          </div>
          <div className='year'>
            <p className='fs12'>当年发电量 kWh</p>
            <p className='fs14'>{ yearSum }</p>
          </div>
          <div className='all'>
            <p className='fs12'>累计发电量 kWh</p>
            <p className='fs14'>{ totalSum }</p>
          </div>
        </div>
      </div>
    )
  }
}
