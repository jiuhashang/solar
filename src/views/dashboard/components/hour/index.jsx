import React, { Component } from 'react'
// import moment from 'moment'
import './index.less'
import { Table } from 'antd'
import { getStationList } from '../../../../api/monitoring'
import { getProvince } from '../../../../api'

export default class Hour extends Component {
  state = {
    list: [],
    province: []
  }
  componentDidMount() {
    this.getList()
    this.getProvince()
  }

  getList = () => {
    getStationList({ orderType: 1 }).then(res => {
      // console.log(res)
      this.setState({
        list: res.data.records
      })
    })
  }

  getProvince = () => {
    getProvince().then(res => {
      // console.log(res)
      this.setState({
        province: res.data
      })
    })
  }

  setProvince = (province, city, area) => {

  }
  
  render() {
    const { list } = this.state
    const columns = [
      {
        title: '电站名称',
        dataIndex: 'stationName',
        ellipsis: true
      },
      {
        title: '电站地址',
        dataIndex: 'address',
        render: (row) => {
          // console.log(address)
        }
      },
      {
        title: '满发电小时(h)',
        dataIndex: 'electricHour'
      }
    ]
    return (
      <div className='hour'>
        <div className="top">
          <div style={{fontSize: 14, color: '#000'}}>日满发小时排名</div>
        </div>
        <div className="bottom">
          <Table columns={columns} dataSource={list} pagination={false} rowKey='id' />
        </div>
      </div>
    )
  }
}
