import React, { Component } from 'react'
// import './index.less'
import { Table, Progress } from 'antd'

const columns = [
  {
    width: '25%',
    title: '电站名称',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    className: 'fs12'
  },
  {
    width: '65%',
    title: '电站地址',
    dataIndex: 'address',
    key: 'address',
    className: 'fs12',
    render: () => <Progress percent={30} />
  }
]
const data = [
  {
    key: '1',
    name: '浙江省杭州市上城区西子智慧产业园上的那时的你爱上帝爱上帝哈师大是',
    address: '浙江省-杭州市'
  }
]
export default class Power extends Component {
  render() {
    return (
      <div className='hour'>
        <div className="top" style={{fontSize: 14, color: '#000'}}>功率归一化排名</div>
        <div className="bottom">
          <Table columns={columns} dataSource={data} pagination={false} showHeader={false} bordered={false} />
        </div>
      </div>
    )
  }
}
