// 气象站 
import React, { Component } from 'react'
import { Tooltip, Table, Card, Drawer, Row, Col, Descriptions } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined
} from '@ant-design/icons'
import Chart from '../../components/chart'

import { getDeviceList, getDeviceDetail } from '../../../../../api/monitoring'

export default class Weather extends Component {
  componentDidMount() {
    this.getDeviceList() // 获取气象站列表
  }
  state = {
    dCurrent: 0,
    id: undefined,
    deviceForm: {
      deviceType: 2,
      pageIndex: 1,
      pageSize: 10
    },
    weathers: {},
    open: false,
    status: undefined,
    deviceId: undefined,
    deviceName: undefined,
    weatherInfo: {}
  }

  // 获取逆变器列表
  getDeviceList = (pageIndex=1, pageSize=10) => {
    const deviceForm = {
      deviceType: 2,
      pageIndex,
      pageSize
    }
    getDeviceList(deviceForm).then(res => {
      const result = res.data
      const obj = {
        current: result.current,
        pageSize: result.size,
        total: result.total,
        weather: result.records
      }
      this.setState({
        weathers: obj
      })
    })
  }

  // 获取气象站详情
  showDrawer = (row) => {
    getDeviceDetail({ deviceId: row.id }).then(res => {
      let obj = {}
      res.data.forEach(item => {
        obj[item.keyName] = item.valueName
      })
      this.setState({
        weatherInfo: {...obj}
      })
    })
    this.setState({
      open: true,
      deviceId: row.deviceId,
      deviceName: row.deviceName,
      status: row.status
    })
  }
  drawerClose = () => {
    this.setState({ open: false })
  }
  dTabSwitch = (dCurrent = 0) => {
    this.setState({ dCurrent })
  }
  render() {
    const { id, weathers: { weather, total, current }, open, deviceName, deviceId, status, dCurrent, weatherInfo } = this.state
    const columns = [
      {
        title: '设备名称/SN',
        width: 200,
        fixed: 'left',
        render: (val) => (
          <div onClick={() => this.showDrawer(val)} style={{ cursor: 'pointer' }}>
            <div>{val.deviceName}</div>
            <div>{val.deviceSn}</div>
          </div>
        )
      },
      {
        title: '状态',
        width: 120,
        render: val =>  
          val.status === 0 ?
          <MinusCircleOutlined style={{ color: '#8C8C8C' }} />: val.status === 1 ? 
          <CheckCircleOutlined style={{ color: '#41D068' }} /> :
          <CloseCircleOutlined style={{ color: 'red' }} /> 
      },
      {
        title: '所属电站',
        dataIndex: 'stationName',
        key: 'stationName',
        width: 420,
      },
      // {
      //   title: '所属父设备',
      //   dataIndex: 'deviceSn',
      //   key: 'deviceSn',
      //   width: 150,
      // },
      // {
      //   title: '父设备状态',
      //   dataIndex: 'status',
      //   key: 'status',
      //   width: 150
      // },
      {
        title: '最新更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 200
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
      <>
        <Table columns={columns} rowKey={(record) => record.id} dataSource={weather} 
          pagination={{
            defaultCurrent: 1, // 默认当前页数
            defaultPageSize: 10, // 默认当前页显示数据的大小
            showSizeChanger: true, 
            showQuickJumper: true,
            pageSizeOptions: [5,10,20,50],
            showTotal: total => `共${total}条`,
            onShowSizeChange: (current, pageSize) => this.getDeviceList(current, pageSize),
            onChange: (current, size) => this.getDeviceList(current, size),
            total,
            current
          }}
        />
        <Drawer
          placement='right'
          width='80%'
          drawerStyle={{ backgroundColor: '#F2F2F2' }}
          closable={false}
          mask={true}
          destroyOnClose={true}
          open={open}
          bodyStyle={{ padding: 0 }}
        >
          <div style={{ padding: 15, backgroundColor: '#fff' }}>
            <Row>
              <Col span={8}>
                <div style={{ fontSize: 12 }}>
                  <div>
                    <span>{deviceName}</span>
                    <span>{deviceId}</span>
                  </div>
                  {
                    status === 0 ?
                      <div style={{ color: '#8C8C8C' }}><CheckCircleOutlined /> <span>离线</span></div> : status === 1 ?
                      <div style={{ color: '#41D068' }}><CloseCircleOutlined /> <span>在线</span></div> :
                      <div style={{ color: 'red' }}><MinusCircleOutlined /> <span>报警</span></div>
                  }
                  <div style={{ marginTop: 10 }}>
                    <span onClick={() => this.dTabSwitch(0)} className={dCurrent === 0 ? 'cur' : 'nocur'}>设备详情</span>
                    <span onClick={() => this.dTabSwitch(1)} className={dCurrent === 1 ? 'cur' : 'nocur'} style={{ margin: '0 20px' }}>报警信息</span>
                    <span onClick={() => this.dTabSwitch(2)} className={dCurrent === 2 ? 'cur' : 'nocur'}>连接信息</span>
                    <span onClick={() => this.dTabSwitch(3)} className={dCurrent === 3 ? 'cur' : 'nocur'} style={{ margin: '0 20px' }}>历史数据</span>
                  </div>
                </div>
              </Col>
              <Col span={6} offset={10}>
                <CloseCircleOutlined style={{ color: 'red', fontSize: 26, cursor: 'pointer' }} onClick={this.drawerClose} />
              </Col>
            </Row>
          </div>
          <div style={{ padding: 20 }}>
            {
              dCurrent === 0 ? (
                <>
                  <Card style={{ marginBottom: 5 }}>
                    <div style={{ fontSize: 16, marginBottom: 20 }}>基础信息</div>
                    <Row className='fs12' style={{ marginBottom: 10 }}>
                      <Col span={8}>SN号：{weatherInfo.SN1}</Col>
                    </Row>
                  </Card>
                  <Card>
                    <div style={{ fontSize: 16, marginBottom: 20 }}>版本信息</div>
                    <Descriptions bordered size='small'>
                      <Descriptions.Item label="组件功率温度系数">{weatherInfo.T_Mod_cft_P1}</Descriptions.Item>
                      <Descriptions.Item label="当日平均气温(℃)">{weatherInfo.T_dyd_avg1}</Descriptions.Item>
                      <Descriptions.Item label="当日水平面辐照量(kWh/㎡)">{weatherInfo.Hor_dyd_inc1}</Descriptions.Item>
                      <Descriptions.Item label="当日倾斜面辐照量(kWh/㎡)">{weatherInfo.IRR_dyd_inc_plane1}</Descriptions.Item>
                      <Descriptions.Item label="当日理论发电量(MkW)">{weatherInfo.The_dyd_P1}</Descriptions.Item>
                    </Descriptions>
                  </Card>
                </>
              ) : dCurrent === 1 ? '报警信息' : dCurrent === 2 ? '连接信息' : <Chart deviceId={id} />
            }
          </div>
        </Drawer>
      </>
    )
  }
}
