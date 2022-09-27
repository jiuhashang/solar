import React, { Component } from 'react'
import moment from 'moment'
import './index.less'
import { DatePicker, Table } from 'antd'

const columns = [
  {
    title: '电站名称',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    className: 'fs12'
  },
  {
    title: '电站地址',
    dataIndex: 'address',
    key: 'address',
    className: 'fs12'
  },
  {
    title: '满发电小时(h)',
    dataIndex: 'age',
    key: 'age',
    className: 'fs12'
  }
]
const data = [
  {
    key: '1',
    name: '浙江省杭州市上城区西子智慧产业园上的那时的你爱上帝爱上帝哈师大是',
    age: 32,
    address: '浙江省-杭州市'
  }
]

const dateFormat = 'YYYY/MM/DD'
export default class Hour extends Component {
  onChange = (date, dateString) => {
    // console.log(date, dateString);
  }
  render() {
    return (
      <div className='hour'>
        <div className="top">
          <div style={{fontSize: 14, color: '#000'}}>日满发小时排名</div>
          <div><DatePicker onChange={this.onChange} defaultValue={moment('2022/9/15', dateFormat)} size='small' /></div>
        </div>
        <div className="bottom">
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </div>
    )
  }
}
