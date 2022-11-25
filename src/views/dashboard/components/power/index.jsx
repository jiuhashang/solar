import React, { Component } from 'react'
// import './index.less'
import { Table, Progress } from 'antd'
import { getStationList } from '../../../../api/monitoring'

export default class Power extends Component {
  state = {
    list: []
  }
  componentDidMount() {
    this.getList()
  }

  getList = () => {
    getStationList({ orderType: 2 }).then(res => {
      this.setState({
        list: res.data.records
      })
    })
  }
  render() {
    const columns = [
      {
        width: '40%',
        title: '电站名称',
        dataIndex: 'stationName',
        ellipsis: true
      },
      {
        width: '60%',
        title: '功率归一化',
        dataIndex: 'powerInOne',
        render: (powerInOne) => <Progress percent={(powerInOne * 100).toFixed(2)} />
      }
    ]
    const { list } = this.state
    return (
      <div className='hour'>
        <div className="top" style={{fontSize: 14, color: '#000'}}>功率归一化排名</div>
        <div className="bottom">
          <Table rowKey='id' columns={columns} dataSource={list} pagination={false} />
        </div>
      </div>
    )
  }
}
