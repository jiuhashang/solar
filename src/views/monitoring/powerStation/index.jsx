import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Table, Tooltip, Drawer } from 'antd'
import {
  BankTwoTone,
  CheckCircleOutlined,
  MinusCircleOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
  StopOutlined,
  SyncOutlined,
  CaretDownOutlined,
  UnorderedListOutlined,
  EnvironmentOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import FormData from './components/FormData.jsx'

import { getStationList } from '../../../api/monitoring'
import './index.less'
// 电站列表
export default class Power extends Component {
  state = {
    stationList: [], // 电站列表
    current: 0,
    open: false,
    open1: false
  }
  componentDidMount() {
    this.gitList()
    this.tabSwitch()
  }

  // 获取电站列表
  gitList = () => {
    getStationList().then(res => {
      // console.log(res)
      this.setState({
        stationList: res.data.records
      })
    })
  }

  tabSwitch = (current = 0) => {
    this.setState({ current })
  }
  showDrawer = () => {
    this.setState({ open: true })
  }
  closeDrawer = (status) => {
    this.setState({
      open: status
    })
  }
  showDrawer1 = () => {
    const { open1 } = this.state
    this.setState({ open1: !open1 })
  }

  render() {
    const { stationList, current, open, open1 } = this.state
    const columns = [
      {
        title: '电站名称',
        width: 200,
        fixed: 'left',
        render: (row) => (
          <Link to={`/station/dashboard?stationId=${row.id}`} target='_blank'>{row.stationName}</Link>
        )
      },
      {
        title: '通讯',
        width: 100,
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: '报警',
        dataIndex: 'address',
        key: '1',
        width: 150,
      },
      {
        title: '装机容量',
        dataIndex: 'address',
        key: '2',
        width: 150,
      },
      {
        title: '发电功率',
        dataIndex: 'address',
        key: '3',
        width: 150,
      },
      {
        title: '功率归一化',
        dataIndex: 'address',
        key: '4',
        width: 150,
      },
      {
        title: '当日发电量',
        dataIndex: 'address',
        key: '5',
        width: 150,
      },
      {
        title: '当日满发小时',
        dataIndex: 'address',
        key: '6',
        width: 150,
      },
      {
        title: '最新发生报警',
        dataIndex: 'address',
        key: '7',
        width: 150,
      },
      {
        title: '最新更新时间',
        dataIndex: 'address',
        key: '8',
        width: 150
      },
      {
        title: '更新日期',
        dataIndex: 'address',
        key: '9',
        width: 150
      },
      {
        title: '电站状态',
        dataIndex: 'address',
        key: '10',
        width: 150
      },
      {
        title: '操作',
        key: 'operation',
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
    return (
      <div className='power'>
        <div className='top'>
          <div>
            <span style={{ fontSize: 18, fontWeight: 'bold' }}>电站列表</span>
            <UnorderedListOutlined style={{ fontSize: 14, padding: '0 10px 0 30px' }} />
            <EnvironmentOutlined style={{ fontSize: 14 }} />
          </div>
          <div>
            <Button type="primary" onClick={this.showDrawer}>创建电站</Button>
          </div>
        </div>
        <Card style={{ marginTop: 20, fontSize: 12 }} size='small'>
          <div style={{ padding: '0 15px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <span onClick={() => this.tabSwitch(0)} className={current === 0 ? 'cur' : 'nocur'}>
                <BankTwoTone />&nbsp;
                电站总数
              </span>
              <span onClick={() => this.tabSwitch(1)} className={current === 1 ? 'cur' : 'nocur'} style={{ margin: '0 20px' }}>
                <CheckCircleOutlined style={{ color: '#70B603' }} />&nbsp;
                通讯正常
              </span>
              <span onClick={() => this.tabSwitch(2)} className={current === 2 ? 'cur' : 'nocur'}>
                <MinusCircleOutlined style={{ color: '#8400FF' }} />&nbsp;
                全部离线
              </span>
              <span onClick={() => this.tabSwitch(3)} className={current === 3 ? 'cur' : 'nocur'} style={{ margin: '0 20px' }}>
                <ExclamationCircleOutlined style={{ color: '#F59A23' }} />&nbsp;
                部分离线
              </span>
              <span onClick={() => this.tabSwitch(4)} className={current === 4 ? 'cur' : 'nocur'}>
                <CheckCircleOutlined style={{ color: '#70B603' }} />&nbsp;
                无报警
              </span>
              <span onClick={() => this.tabSwitch(5)} className={current === 5 ? 'cur' : 'nocur'} style={{ margin: '0 20px' }}>
                <WarningOutlined style={{ color: '#D9001B' }} />&nbsp;
                有报警
              </span>
              <span onClick={() => this.tabSwitch(6)} className={current === 6 ? 'cur' : 'nocur'}>
                <StopOutlined style={{ color: '#7F7F7F' }} />&nbsp;
                未接入
              </span>
            </div>
            <div>
              <span style={{ fontSize: 12, cursor: 'pointer' }} onClick={this.showDrawer1}>展开筛选</span>
              <CaretDownOutlined style={{ margin: '0 20px 0 10px' }} />
              <SyncOutlined style={{ fontSize: 16, cursor: 'pointer' }} />
            </div>
          </div>
        </Card>
        <Card id='drawerRef' className="site-drawer-render-in-current-wrapper">
          <Drawer
            headerStyle={{ display: 'none' }}
            placement="top"
            closable={false}
            open={open1}
            getContainer={document.getElementById('drawerRef')}
            style={{ position: 'absolute' }}
          >
          </Drawer>
          {
            current === 0 ? <Table rowKey='id' columns={columns} dataSource={stationList} /> : current === 1 ? '通讯正常' : current === 2 ? '全部离线' : current === 3 ? '部分离线' : current === 4 ? '无报警' : current === 5 ? '有报警' : '未接入'
          }
        </Card>
        <FormData open={open} closeDrawer={this.closeDrawer} />
      </div >
    )
  }
}
