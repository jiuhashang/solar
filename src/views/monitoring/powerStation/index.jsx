import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Table, Tooltip, Drawer, Row, Col, Divider, Cascader, Input } from 'antd'
import {
  BankTwoTone,
  CheckCircleOutlined,
  MinusCircleOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
  StopOutlined,
  // SyncOutlined,
  CaretDownOutlined,
  UnorderedListOutlined,
  EnvironmentOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined
} from '@ant-design/icons'
import AddStation from './components/AddStation.jsx'

import { getStationList, getCityList } from '../../../api/monitoring'
import { getDeviceStatusNum } from '../../../api'
import './index.less'
// 电站列表
export default class Power extends Component {
  state = {
    allConnectionOut: 0, // 全部离线
    connectionIn: 0, // 通讯正常
    joinIn: 0, // 未接入
    noWorn: 0, // 无报警
    partConnectionOut: 0, // 部分离线
    partWorn: 0, // 有报警
    totalNum: 0, // 电站总数

    connectionStatus: undefined, // 通讯
    wornStatus: undefined, // 报警
    joinStatus: undefined, // 接入
    provinceId: undefined,
    cityId: undefined,
    areaId: undefined,
    installedCapacityStart: undefined, // 起始装机容量
    installedCapacityEnd: undefined, // 结束装机容量
    stationType: undefined, // 电站类型
    systemType: undefined, // 系统类型

    cascaderValue: [],

    list: [], // 电站列表
    current: 0,
    open: false,
    open1: false, 
    options: [], // 省市区
  }
  componentDidMount() {
    this.getList()
    this.getDeviceStatusNum()
  }

  // 获取电站列表
  getList = () => {
    const { connectionStatus, wornStatus, joinStatus, provinceId, cityId, areaId, installedCapacityStart, installedCapacityEnd, stationType, systemType } = this.state
    const obj = { connectionStatus, wornStatus, joinStatus, provinceId, cityId, areaId, installedCapacityStart, installedCapacityEnd, stationType, systemType }
    getStationList(obj).then(res => {
      // console.log(res)
      this.setState({
        list: res.data.records
      })
    })
  }
  // 获取电站数量
  getDeviceStatusNum = () => {
    getDeviceStatusNum().then(res => {
      const { allConnectionOut, connectionIn, joinIn, noWorn, partConnectionOut, partWorn, totalNum } = res.data
      this.setState({ allConnectionOut, connectionIn, joinIn, noWorn, partConnectionOut, partWorn, totalNum })
    })
  }
  tabSwitch = (current = 0) => {
    if (current === 0) {
      this.setState({
        current,
        connectionStatus: undefined,
        wornStatus: undefined,
        joinStatus: undefined
      }, () => { this.getList() })
    } else if (current === 1) {
      this.setState({
        current,
        connectionStatus: 0,
        wornStatus: undefined,
        joinStatus: undefined
      }, () => { this.getList() })
    } else if (current === 2) {
      this.setState({
        current,
        connectionStatus: 2,
        wornStatus: undefined,
        joinStatus: undefined
      }, () => { this.getList() })
    } else if (current === 3) {
      this.setState({
        current,
        connectionStatus: 1,
        wornStatus: undefined,
        joinStatus: undefined
      }, () => { this.getList() })
    } else if (current === 4) {
      this.setState({
        current,
        connectionStatus: undefined,
        wornStatus: 0,
        joinStatus: undefined
      }, () => { this.getList() })
    } else if (current === 5) {
      this.setState({
        current,
        connectionStatus: undefined,
        wornStatus: 1,
        joinStatus: undefined
      }, () => { this.getList() })
    } else if (current === 6) {
      this.setState({
        current,
        connectionStatus: undefined,
        wornStatus: undefined,
        joinStatus: 0
      }, () => { this.getList() })
    }
  }
  // 获取 省市区
  getCity = (data) => {
    let arr = []
    let obj = {}
    data.forEach(item => {
      if (item.ywCityInfoList) {
        item.ywCityInfoList = this.getCity(item.ywCityInfoList)
      }	
      obj = {
        value: item.id,
        label: item.cityName,
        children: item.ywCityInfoList
      }					
	    arr.push(obj)
    })
	  return arr
  }
  getCities = () => {
    getCityList().then(res => {
      const options = this.getCity(res.data)
      this.setState({
        options
      })
    })
  }
  areaChange = (value) => {
    this.setState({
      cascaderValue: value,
      provinceId: value[0], // 省
      cityId: value[1], // 市
      areaId: value[2], // 区
    })
  }
  start = (e) => {
    this.setState({
      installedCapacityStart: e.target.value
    })
  }
  end = (e) => {
    this.setState({
      installedCapacityEnd: e.target.value
    })
  }
  stationTab = (stationType) => {
    this.setState({ stationType })
  }
  systemTab = (systemType) => {
    this.setState({ systemType })
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
    this.getCities()
    const { open1 } = this.state
    this.setState({ open1: !open1 })
  }

  onClose = () => {
    this.setState({
      installedCapacityStart: undefined, // 起始装机容量
      installedCapacityEnd: undefined, // 结束装机容量
      stationType: undefined, // 电站类型
      systemType: undefined, // 系统类型
      cascaderValue: [],
      open1: false
    })
  }
  reset = () => {
    this.setState({
      installedCapacityStart: undefined, // 起始装机容量
      installedCapacityEnd: undefined, // 结束装机容量
      stationType: undefined, // 电站类型
      systemType: undefined, // 系统类型
      cascaderValue: []
    })
  }
  search = () => {
    this.getList()
    this.setState({
      open1: false
    })
  }
  
  render() {
    const { allConnectionOut, connectionIn, joinIn, noWorn, partConnectionOut, partWorn, totalNum, list, current, open, open1, options, installedCapacityStart, installedCapacityEnd, stationType, systemType, cascaderValue } = this.state
    const columns = [
      {
        title: '电站名称',
        width: 300,
        fixed: 'left',
        ellipsis: true,
        render: (row) => (
          <Link to={`/station/dashboard?stationId=${row.id}`} target='_blank'>{row.stationName}</Link>
        )
      },
      {
        title: '通讯',
        width: 60,
        dataIndex: 'connectStatus',
        render: connectStatus => connectStatus === 0 ? <CheckCircleOutlined style={{ color: '#41D068' }} /> : <ExclamationCircleOutlined style={{ color: '#F8B51E' }} />
      },
      {
        title: '报警',
        dataIndex: 'wornStatus',
        width: 60,
        render: wornStatus => wornStatus === 0 ? <CheckCircleOutlined style={{ color: '#41D068' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />
      },
      {
        title: '装机容量 (kWp)',
        dataIndex: 'installedCapacity',
        width: 120,
        render: installedCapacity => installedCapacity / 1000
      },
      {
        title: '发电功率 (kW)',
        dataIndex: 'electricPower',
        width: 120,
        render: electricPower => (electricPower / 1000).toFixed(2)
      },
      {
        title: '功率归一化 (%)',
        dataIndex: 'powerInOne',
        width: 120,
        render: powerInOne => (powerInOne * 100).toFixed(2)
      },
      {
        title: '当日发电量 (kWh)',
        dataIndex: 'dateElectric',
        width: 130
      },
      {
        title: '当日满发小时 (h)',
        dataIndex: 'electricHour',
        width: 130      
      },
      {
        title: '最新发生报警',
        dataIndex: 'address',
        width: 160
      },
      {
        title: '最新更新时间',
        dataIndex: 'updateTime',
        width: 160
      },
      {
        title: '更新日期',
        dataIndex: 'updateTime',
        width: 180
      },
      {
        title: '电站状态',
        dataIndex: 'gridConnectionTime',
        width: 100,
        render: gridConnectionTime => gridConnectionTime ? '已并网' : '未并网'
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
                电站总数 ({totalNum})
              </span>
              <span onClick={() => this.tabSwitch(1)} className={current === 1 ? 'cur' : 'nocur'} style={{ margin: '0 20px' }}>
                <CheckCircleOutlined style={{ color: '#70B603' }} />&nbsp;
                通讯正常 ({connectionIn})
              </span>
              <span onClick={() => this.tabSwitch(2)} className={current === 2 ? 'cur' : 'nocur'}>
                <MinusCircleOutlined style={{ color: '#8400FF' }} />&nbsp;
                全部离线 ({allConnectionOut})
              </span>
              <span onClick={() => this.tabSwitch(3)} className={current === 3 ? 'cur' : 'nocur'} style={{ margin: '0 20px' }}>
                <ExclamationCircleOutlined style={{ color: '#F59A23' }} />&nbsp;
                部分离线 ({partConnectionOut})
              </span>
              <span onClick={() => this.tabSwitch(4)} className={current === 4 ? 'cur' : 'nocur'}>
                <CheckCircleOutlined style={{ color: '#70B603' }} />&nbsp;
                无报警 ({noWorn})
              </span>
              <span onClick={() => this.tabSwitch(5)} className={current === 5 ? 'cur' : 'nocur'} style={{ margin: '0 20px' }}>
                <WarningOutlined style={{ color: '#D9001B' }} />&nbsp;
                有报警 ({partWorn})
              </span>
              <span onClick={() => this.tabSwitch(6)} className={current === 6 ? 'cur' : 'nocur'}>
                <StopOutlined style={{ color: '#7F7F7F' }} />&nbsp;
                未接入 ({joinIn})
              </span>
            </div>
            <div>
              <span style={{ fontSize: 12, cursor: 'pointer' }} onClick={this.showDrawer1}>展开筛选</span>
              <CaretDownOutlined style={{ margin: '0 20px 0 10px' }} />
              {/* <SyncOutlined style={{ fontSize: 16, cursor: 'pointer' }} /> */}
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
            <Row gutter={20}>
              <Col span={2}>电站区域</Col>
              <Col>
                <Cascader options={options} onChange={this.areaChange} style={{width: 280}} value={cascaderValue} />
              </Col>
            </Row>
            <Divider />
            <Row gutter={20}>
              <Col span={2}>装机容量</Col>
              <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Input onChange={this.start} style={{width: 280}} type='number' value={installedCapacityStart} placeholder='最小容量 kWp' /> ~ <Input onChange={this.end} style={{width: 280}} type='number' value={installedCapacityEnd} placeholder='最大容量 kWp' />
              </Col>
            </Row>
            <Divider />
            <Row gutter={20}>
              <Col span={2}>电站类型</Col>
              <Col>
                <span style={{color: stationType === 0 ? '#1890FF' : ''}} className='nocur' onClick={() => this.stationTab(0)}>分布式户用</span>
                <span style={{color: stationType === 1 ? '#1890FF' : '', margin: '0 20px'}} className='nocur' onClick={() => this.stationTab(1)}>分布式商业</span>
                <span style={{color: stationType === 2 ? '#1890FF' : ''}} className='nocur' onClick={() => this.stationTab(2)}>分布式工业</span>
                <span style={{color: stationType === 3 ? '#1890FF' : '', marginLeft: 20}} className='nocur' onClick={() => this.stationTab(3)}>地面电站</span>
              </Col>
            </Row>
            <Divider />
            <Row gutter={20}>
              <Col span={2}>系统类型</Col>
              <Col>
                <span style={{color: systemType === 0 ? '#1890FF' : ''}} className='nocur' onClick={() => this.systemTab(0)}>光伏+电网</span>
                <span style={{color: systemType === 1 ? '#1890FF' : '', margin: '0 20px'}} className='nocur' onClick={() => this.systemTab(1)}>光伏+电网+用电</span>
                <span style={{color: systemType === 2 ? '#1890FF' : ''}} className='nocur' onClick={() => this.systemTab(2)}>光伏+电网+用电+储能</span>
              </Col>
            </Row>
            <Divider />
            <Button style={{ marginLeft: 136 }} onClick={this.onClose}>取消</Button>
            <Button style={{ margin: '0 20px' }} onClick={this.reset}>重置</Button>
            <Button type='primary' onClick={this.search}>确 定</Button>
          </Drawer>
          <Table rowKey='id' columns={columns} dataSource={list} scroll={{ x: 1500 }} />
        </Card>
        <AddStation open={open} closeDrawer={this.closeDrawer} />
      </div >
    )
  }
}
