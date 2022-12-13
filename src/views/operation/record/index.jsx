import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Table, Tooltip } from 'antd'
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import AddForm from '../components/add'
import Detail from '../components/detail'
import { getLog } from '../../../api/operation'
import './index.less'

export default class Record extends Component {
  state = {
    pageIndex: 1,
    pageSize: 10,
    list: [], 
    open: false, // 添加/修改 维保记录 弹框
    openDetail: false, // 详情 弹框
  }

  componentDidMount () {
    this.getList()
  }
  // 获取维保记录
  getList = () => {
    const { pageIndex, pageSize } = this.state
    getLog({pageIndex, pageSize}).then(res => {
      console.log(res)
    })
  }

  // 添加/修改 维保记录 弹框 开关
  showDrawer = () => {
    this.setState({ open: true })
  }
  closeDrawer = (status) => {
    this.setState({
      open: status
    })
  }
  closeDetail = (status) => {
    this.setState({
      openDetail: status
    })
  }

  render() {
    const columns = [
      {
        title: '维保标题',
        width: 300,
        fixed: 'left',
        ellipsis: true,
        render: (row) => (
          <Link>{row.stationName}</Link>
        )
      },
      {
        title: '维保人',
        width: 120,
        dataIndex: 'connectStatus'
      },
      {
        title: '维保时间',
        dataIndex: 'wornStatus',
        width: 150
      },
      {
        title: '维保类型',
        dataIndex: 'installedCapacity',
        width: 120
      },
      {
        title: '维保电站',
        dataIndex: 'electricPower',
        width: 300,
        ellipsis: true
      },
      {
        title: '维保目标',
        dataIndex: 'powerInOne',
        width: 300,
        ellipsis: true
      },
      {
        title: '创建时间',
        dataIndex: 'dateElectric',
        width: 150
      },
      {
        title: '更新时间',
        dataIndex: 'electricHour',
        width: 150
      },
      {
        title: '操作',
        fixed: 'right',
        width: 100,
        render: () => (
          <>
            <Tooltip title="编辑" color='black'>
              <EditOutlined style={{ padding: '0 10px 0 10px', cursor: 'pointer' }} />
            </Tooltip>
            <Tooltip title="删除" color='black'>
              <DeleteOutlined style={{ cursor: 'pointer' }} />
            </Tooltip>
          </>
        )
      }
    ]
    const { list, open, openDetail } = this.state
    return (
      <div className='record'>
        <div className='top'>
          <div style={{ fontSize: 18 }}>维保记录</div>
          <Button type="primary" onClick={this.showDrawer}>添加新维保记录</Button>
        </div>
        <Card className='record-content'>
          <Table rowKey='id' columns={columns} dataSource={list} scroll={{ x: 1500 }} />
        </Card>
        {/* 添加/修改 维保记录 */}
        <AddForm open={open} closeDrawer={this.closeDrawer} />
        {/* 详情 */}
        <Detail open={openDetail} closeDrawer={this.closeDetail} />
      </div>
    )
  }
}
