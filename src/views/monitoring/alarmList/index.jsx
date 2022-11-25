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
    keyValue: '',
    data: []
  }
  getList = () => {
    const { stationId, deviceSn, level, status, startTime, endTime, pageIndex, pageSize } = this.state
    const obj = { stationId, deviceSn, level, status, startTime, endTime, pageIndex, pageSize }
    getWornList(obj).then(res => {
      this.setState({
        data: res.data.records
      })
    })
  }
  // 全部 发生中 已恢复 切换
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

  // 报警等级 切换
  tab = (level) => {
    this.setState({ level })
  } 
  // 搜索开始时间 
  timeChange = (date, dateString) => {
    this.setState({
      startTime: dateString[0],
      endTime: dateString[1]
    })
  }
  
  showDrawer = () => {
    const { open } = this.state
    this.setState({ open: !open })
  }
  
  reset = () => {
    this.setState({
      keyValue: new Date(),
      level: undefined,
      startTime: undefined,
      endTime: undefined
    })
  }
  
  onClose = () => {
    this.setState({
      keyValue: new Date(),
      level: undefined,
      startTime: undefined,
      endTime: undefined,
      open: false
    })
  }

  search = () => {
    this.getList()
    this.showDrawer()
  }
  
  render() {
    const { current, level, open, data, keyValue } = this.state

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
        width: 100,
        render: (row) => (
          row.status === 0 ? <span>发生中</span> : <span>已恢复</span>
        )
      },
      {
        title: '等级',
        width: 100,
        render: (row) => (
          row.level === 0 ? <Button type="primary" size='small'>提示</Button> : row.level === 1 ? <Button style={{ backgroundColor: '#F59A23', color: '#fff', border: 'none' }} size='small'>警告</Button> : <Button type="danger" size='small'>故障</Button> 
        )
      },
      {
        title: '电站',
        dataIndex: 'stationName',
        width: 300,
        ellipsis: true,
      },
      {
        title: '告警类型',
        dataIndex: 'type',
        width: 100
      },
      {
        title: '设备',
        width: 180,
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
        width: 200
      },
      {
        title: '恢复时间',
        dataIndex: 'returnTime',
        width: 200
      },
      {
        title: '持续时间(min)',
        dataIndex: 'address',
        width: 200
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
          <Table columns={columns} dataSource={data} rowKey='id' scroll={{ x: 1500 }} />
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
                <span style={{color: level === 0 ? '#1890FF' : ''}} className='nocur' onClick={() => this.tab(0)}>提示</span>
                <span style={{color: level === 1 ? '#1890FF' : '', margin: '0 20px'}} className='nocur' onClick={() => this.tab(1)}>警告</span>
                <span style={{color: level === 2 ? '#1890FF' : ''}} className='nocur' onClick={() => this.tab(2)}>故障</span>
              </Col>
            </Row>
            <Divider />
            <Row gutter={20}>
              <Col span={2}>开始时间</Col>
              <Col>
                <RangePicker onChange={this.timeChange} key={keyValue} />
              </Col>
            </Row>
            <Divider />
            <Button style={{ marginLeft: 136 }} onClick={this.onClose}>取消</Button>
            <Button style={{ margin: '0 20px' }} onClick={this.reset}>重置</Button>
            <Button type='primary' onClick={this.search}>确 定</Button>
          </Drawer>
        </Card>
      </div>
    )
  }
}
