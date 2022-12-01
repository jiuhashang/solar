import React, { Component } from 'react'
import { Button, Tooltip, Table } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  KeyOutlined
} from '@ant-design/icons'

export default class Stable extends Component {
  state = {
    list: []
  }
  render() {
    const columns = [
      {
        title: '成员姓名',
        width: 120,
        dataIndex: 'stationName',
        fixed: 'left',
        ellipsis: true,
        render: stationName => <div>{stationName}</div>
      },
      {
        title: '账号状态',
        width: 100,
        dataIndex: 'connectStatus',
      },
      {
        title: '角色',
        dataIndex: 'wornStatus',
        width: 100,
      },
      {
        title: '部门',
        dataIndex: 'installedCapacity',
        width: 150,
        render: installedCapacity => installedCapacity / 1000
      },
      {
        title: '手机号',
        dataIndex: 'electricPower',
        width: 150,
        render: electricPower => (electricPower / 1000).toFixed(2)
      },
      {
        title: '邮箱',
        dataIndex: 'powerInOne',
        width: 150,
        render: powerInOne => (powerInOne * 100).toFixed(2)
      },
      {
        title: '用户名',
        dataIndex: 'dateElectric',
        width: 130
      },
      {
        title: '最近登录',
        dataIndex: 'electricHour',
        width: 130      
      },
      {
        title: '操作',
        fixed: 'right',
        width: 120,
        render: () => (
          <>
            <Tooltip title="重置密码" color='black'>
              <KeyOutlined style={{ padding: '0 10px 0 10px', cursor: 'pointer' }} />
            </Tooltip>
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
    const { list } = this.state
    return (
      <div className='stable'>
        <div className='top'>
          <h3>西子运维</h3>
          <div>
            <Button type="link">添加部门</Button>
            <Button type="link">编辑部门</Button>
            <Button danger type="text">删除</Button>
          </div>
        </div>
        <Table rowKey='id' columns={columns} dataSource={list} scroll={{ x: 1500 }} />
      </div>
    )
  }
}
