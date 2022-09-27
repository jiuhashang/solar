import React, { Component } from 'react'
import { Radio, DatePicker } from 'antd'
import './index.less'

const { MonthPicker } = DatePicker
export default class History extends Component {
  state = {
    value: 'month'
  }
  btnChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  onChange = (date, dateString) => {
    // console.log(date, dateString)
  }
  render() {
    const { value } = this.state

    return (
      <div className='history'>
        <div className='top'>
          <div style={{fontSize: 14, color: '#000'}}>整体数据历史</div>
          <div>
            <Radio.Group value={value} onChange={this.btnChange} size='small'>
              <Radio.Button value="month">月</Radio.Button>
              <Radio.Button value="year">年</Radio.Button>
            </Radio.Group>
            {
              value === 'month' ? <MonthPicker onChange={this.onChange} picker="month" size='small' style={{ marginLeft: 10 }} /> : <DatePicker onChange={this.onChange} mode="year" size='small' style={{ marginLeft: 10 }} />
            }
          </div>
        </div>
        <div className='bottom'>

        </div>
      </div>
    )
  }
}
