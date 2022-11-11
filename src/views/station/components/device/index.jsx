// 设备情况
import React, { Component } from 'react'
import { Card } from 'antd'
import './index.less'
import Inverter from './components/inverter'
import Collector from './components/collector'
import Weather from './components/weather'

export default class Device extends Component {
  state = {
    current: 0
  }
  tabSwitch = (current = 0) => {
    this.setState({ current })
  }
  render() {
    const { current } = this.state
    return (
      <div className='dev'>
        <div className='top'>
          <h1>设备</h1>
        </div>
        <div className='con'>
          <Card style={{ marginTop: 20, fontSize: 12 }} size='small'>
            <div style={{ padding: '10px 15px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <span onClick={() => this.tabSwitch(0)} className={current === 0 ? 'cur' : 'nocur'}>逆变器</span>
                <span onClick={() => this.tabSwitch(1)} className={current === 1 ? 'cur' : 'nocur'} style={{ margin: '0 20px' }}>采集器</span>
                <span onClick={() => this.tabSwitch(2)} className={current === 2 ? 'cur' : 'nocur'}>气象站</span>
                <span onClick={() => this.tabSwitch(3)} className={current === 3 ? 'cur' : 'nocur'} style={{ margin: '0 20px' }}>电表</span>
                <span onClick={() => this.tabSwitch(4)} className={current === 4 ? 'cur' : 'nocur'}>电池</span>
              </div>
              <div>
                
              </div>
            </div>
            {current === 0 ? 
              <Inverter /> : current === 1 ?
              <Collector /> : current === 2 ?
              <Weather /> : current === 3 ?
              '电表' : '电池'}
          </Card>
        </div>
      </div>
    )
  }
}
