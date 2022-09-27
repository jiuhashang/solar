import React, { Component } from 'react'
import { Divider, Progress  } from 'antd'
import './index.less'

export default class Profile extends Component {
  render() {
    return (
      <div className='profile'>
        <div className='top'>
          <div style={{fontSize: 14, color: '#000'}}>整体数据概况</div>
          <div>更新于 2022-05-20 12:10:10</div>
        </div>
        <div className='center'>
          <div className='left'>
            <Progress type="circle" percent={30} width={80} />
            <div>实时发电效率</div>
          </div>
          <div className='middle'>
            <p>实时总功率kW</p>
            <p className='fs14'>1210.22</p>
          </div>
          <div className='right'>
            <p>总装机容量MWp</p>
            <p className='fs14'>1212.04</p>
          </div>
        </div>
        <Divider />
        <div className='bottom'>
          <div className='day'>
            <p>当日发电量MWh</p>
            <p className='fs14'>121.22</p>
          </div>
          <div className='month'>
            <p>当月发电量MWh</p>
            <p className='fs14'>1210.22</p>
          </div>
          <div className='year'>
            <p>当年发电量MWh</p>
            <p className='fs14'>1212.04</p>
          </div>
          <div className='all'>
            <p>累计发电量MWh</p>
            <p className='fs14'>1212.04</p>
          </div>
        </div>
      </div>
    )
  }
}
