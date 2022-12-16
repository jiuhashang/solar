import React, { Component } from 'react'
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
    loading: false,
    open: false, // 添加/修改 维保记录 弹框
    openDetail: false, // 详情 弹框
  }

  componentDidMount () {
    this.getList()
  }
  // 获取维保记录
  getList = () => {
    this.setState({
      loading: true
    })
    const { pageIndex, pageSize } = this.state
    getLog({pageIndex, pageSize}).then(res => {
      this.setState({
        list: res.data.records,
        loading: false
      })
    })
  }

  // 添加/修改 维保记录 弹框 开关
  showDrawer = (row) => {
    this.row = row
    this.setState({ open: true })
  }
  closeDrawer = (status) => {
    this.setState({
      open: status
    })
  }
  // 详情
  showDetailDrawer = (detail) => {
    this.detail = detail
    this.setState({
      openDetail: true
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
        render: (row) => <Button type="link" onClick={() => this.showDetailDrawer(row)}>{row.title}</Button>
      },
      {
        title: '维保人',
        width: 120,
        ellipsis: true,
        dataIndex: 'ywAdminUserList',
        render: (ywAdminUserList) => ywAdminUserList[0].userName + `等${ywAdminUserList.length}人`
      },
      {
        title: '维保时间',
        dataIndex: 'protectTime',
        width: 180
      },
      {
        title: '维保类型',
        dataIndex: 'type',
        width: 120,
        render: (type) => <span>{type === 0 ? '电站' : type === 1 ? '设备' : '其他' }</span>
      },
      {
        title: '维保电站',
        dataIndex: 'stationName',
        width: 300,
        ellipsis: true
      },
      {
        title: '维保目标',
        dataIndex: 'ywStationDeviceList',
        width: 300,
        ellipsis: true,
        render: ywStationDeviceList => ywStationDeviceList[0].deviceName + ywStationDeviceList[0].deviceSn + `等${ywStationDeviceList.length}`
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 180
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        width: 180
      },
      {
        title: '操作',
        fixed: 'right',
        width: 100,
        render: (row) => (
          <>
            <Tooltip title="编辑" color='black'>
              <EditOutlined style={{ padding: '0 10px 0 10px', cursor: 'pointer' }} onClick={() => this.showDrawer(row)} />
            </Tooltip>
            <Tooltip title="删除" color='black'>
              <DeleteOutlined style={{ cursor: 'pointer' }} />
            </Tooltip>
          </>
        )
      }
    ]
    const { list, loading, open, openDetail } = this.state
    const row = this.row || {}
    const detail = this.detail || {}
    return (
      <div className='record'>
        <div className='top'>
          <div style={{ fontSize: 18 }}>维保记录</div>
          <Button type="primary" onClick={this.showDrawer}>添加新维保记录</Button>
        </div>
        <Card className='record-content'>
          <Table loading={loading} rowKey='id' columns={columns} dataSource={list} scroll={{ x: 1500 }} />
        </Card>
        {/* 添加/修改 维保记录 */}
        <AddForm open={open} closeDrawer={this.closeDrawer} row={row} />
        {/* 详情 */}
        <Detail open={openDetail} closeDetail={this.closeDetail} detail={detail} />
      </div>
    )
  }
}
