import React, { Component } from 'react'
import { Divider, Progress  } from 'antd'
import dayjs from 'dayjs'
import './index.less'

import { getStationCount } from '../../../../api/station'
export default class Profile extends Component {
  state = {
    dateSum: 0,
    electricityScale: 0,
    monSum: 0,
    sumPower: 0,
    totalInstall: 0,
    totalSum: 0,
    yearSum: 0
  }

  getStationCount = () => {
    getStationCount().then(res => {
      const { dateSum, electricityScale, monSum, sumPower, totalInstall, totalSum, yearSum } = res.data
      this.props.getTotalSum(totalSum)
      this.setState({
        dateSum,
        electricityScale,
        monSum,
        sumPower,
        totalInstall,
        totalSum,
        yearSum
      })
    })
  }
  

  componentDidMount() {
    this.getStationCount()
  }
  render() {
    const { dateSum, electricityScale, monSum, sumPower, totalInstall, totalSum, yearSum } = this.state
    return (
      <div className='profile'>
        <div className='top'>
          <div style={{fontSize: 14, color: '#000'}}>整体数据概况</div>
          <div>更新于 {dayjs().format('YYYY-MM-DD HH:mm:ss')}</div>
        </div>
        <div className='center'>
          <div className='left'>
            <Progress type="circle" percent={electricityScale} width={80} />
            <div>实时发电效率</div>
          </div>
          <div className='middle'>
            <p>实时总功率 kW</p>
            <p className='fs14'>{sumPower}</p>
          </div>
          <div className='right'>
            <p>总装机容量 kWp</p>
            <p className='fs14'>{totalInstall}</p>
          </div>
        </div>
        <Divider />
        <div className='bottom'>
          <div className='day'>
            <p>当日发电量 kWh</p>
            <p className='fs14'>{dateSum}</p>
          </div>
          <div className='month'>
            <p>当月发电量 kWh</p>
            <p className='fs14'>{monSum}</p>
          </div>
          <div className='year'>
            <p>当年发电量 kWh</p>
            <p className='fs14'>{yearSum}</p>
          </div>
          <div className='all'>
            <p>累计发电量 kWh</p>
            <p className='fs14'>{totalSum}</p>
          </div>
        </div>
      </div>
    )
  }
}
