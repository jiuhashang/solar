// 报警列表
import {
  EditOutlined,
  DeleteOutlined,
  CaretDownOutlined,
  SyncOutlined
} from '@ant-design/icons'
import React, { Component } from 'react'
import { Card, Table, Drawer, Button, Tooltip, Row, Col, Divider, DatePicker } from 'antd'

import { getWornList } from '../../../api/monitoring'
import './index.less'

const { RangePicker } = DatePicker
export default class Alarm extends Component {
  componentDidMount() {
    this.getList()
  }
  state = {
    open: false,
    current: 1,
    stationId: undefined,
    deviceSn: undefined,
    level: undefined,
    status: 0,
    startTime: undefined,
    endTime: undefined,
    pageIndex: 1,
    pageSize: 10,

    data: []
  }
  getList = () => {
    const { stationId, deviceSn, level, status, startTime, endTime, pageIndex, pageSize } = this.state
    const obj = {
      stationId, deviceSn, level, status, startTime, endTime, pageIndex, pageSize
    }
    getWornList(obj).then(res => {
      this.setState({
        data: res.data.records
      })
    })
  }
  tabSwitch = (current = 1) => {
    if(current === 0) {
      this.setState({
        current,
        status: undefined
      }, () => {
        this.getList()
      })
    } else if(current === 1) {
      this.setState({
        current,
        status: 0
      }, () => {
        this.getList()
      })
    } else if(current === 2) {
      this.setState({
        current,
        status: 1
      }, () => {
        this.getList()
      })
    }
  }
  showDrawer = () => {
    const { open } = this.state
    this.setState({ open: !open })
  }
  onClose = () => {
    this.setState({
      open: false
    })
  }
  render() {
    const { current, open, data } = this.state

    const columns = [
      {
        title: '告警描述',
        width: 200,
        fixed: 'left',
        dataIndex: 'wornName',
        key: 'wornName'
      },
      {
        title: '状态',
        render: (row) => (
          row.status === 0 ? <span>发生中</span> : <span>已恢复</span>
        )
      },
      {
        title: '等级',
        render: (row) => (
          row.level === 0 ? <Button type="primary" size='small'>提示</Button> : row.level === 1 ? <Button style={{ backgroundColor: '#F59A23', color: '#fff', border: 'none' }} size='small'>警告</Button> : <Button type="danger" size='small'>故障</Button> 
        )
      },
      {
        title: '电站',
        dataIndex: 'stationName',
        width: 200,
        key: 'stationName'
      },
      {
        title: '告警类型',
        dataIndex: 'type',
        key: 'type'
      },
      {
        title: '设备',
        render: (row) => (
            <>
              <div>{row.deviceName}</div>
              <div>{row.deviceSn}</div>
            </>
          )
      },
      {
        title: '告警开始时间',
        dataIndex: 'createTime',
        key: 'createTime'
      },
      {
        title: '恢复时间',
        dataIndex: 'returnTime',
        key: 'returnTime'
      },
      {
        title: '持续时间(min)',
        dataIndex: 'address',
        key: '2'
      },
      {
        title: '操作',
        fixed: 'right',
        width: 100,
        render: () => (
          <>
            <Tooltip title="编辑" color='black'>
              <EditOutlined style={{ padding: '0 10px', cursor: 'pointer' }} />
            </Tooltip>
            <Tooltip title="删除" color='black'>
              <DeleteOutlined style={{ cursor: 'pointer' }} />
            </Tooltip>
          </>
        )
      }
    ]
    return (
      <div className='alarm'>
        <div className='title'>
          <div style={{ fontSize: 18, fontWeight: 'bold' }}>告警列表</div>
          <div>
            <Button type="primary">告警推送设置</Button>
          </div>
        </div>

        <Card style={{ marginTop: 20 }} size='small'>
          <div style={{ padding: '0 15px', fontSize: 12, display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <span onClick={() => this.tabSwitch(0)} className={current === 0 ? 'cur' : 'nocur'}>全部</span>
              <span onClick={() => this.tabSwitch(1)} className={current === 1 ? 'cur' : 'nocur'} style={{ margin: '0 20px' }}>发生中</span>
              <span onClick={() => this.tabSwitch(2)} className={current === 2 ? 'cur' : 'nocur'}>已恢复</span>
            </div>
            <div>
              <span style={{ fontSize: 12, cursor: 'pointer' }} onClick={this.showDrawer}>展开筛选</span>
              <CaretDownOutlined style={{ margin: '0 20px 0 10px' }} />
              <SyncOutlined style={{ fontSize: 16, cursor: 'pointer' }} />
            </div>
          </div>
        </Card>

        <Card id='drawer' className='site-drawer-render-in-current-wrapper'>
          <Table columns={columns} dataSource={data} rowKey='id' />
          <Drawer
            headerStyle={{ display: 'none' }}
            placement="top"
            closable={false}
            maskClosable={true}
            open={open}
            getContainer={document.getElementById('drawer')}
            style={{ position: 'absolute' }}
            height='240px'
            onClose={this.onClose}
          >
            <Row gutter={20}>
              <Col span={2}>等级</Col>
              <Col>
                <span className='nocur'>提示</span>
                <span className='nocur' style={{ margin: '0 20px' }}>告警</span>
                <span className='nocur'>故障</span>
              </Col>
            </Row>
            <Divider />
            <Row gutter={20}>
              <Col span={2}>开始时间</Col>
              <Col>
                <RangePicker />
              </Col>
            </Row>
            <Divider />
            <Button style={{ marginLeft: 136 }} onClick={this.onClose}>取消</Button>
            <Button style={{ margin: '0 20px' }}>重置</Button>
            <Button type='primary'>确 定</Button>
          </Drawer>
        </Card>
      </div>
    )
  }
}
