import React, { Component } from 'react'
import { Card, Tooltip, Table, Drawer, Row, Col, Descriptions } from 'antd'
import {
  SyncOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import { getDeviceList } from '../../../api/watch'

import './index.less'
// 设备列表
export default class Device extends Component {
  componentDidMount() {
    getDeviceList().then(res => {
      // console.log(res)
      this.setState({
        inverters: res.data.records
      })
    })
    this.tabSwitch()
  }

  state = {
    current: 0,
    dCurrent: 0,
    inverters: [], // 逆变器
    collectors: [], // 采集器
    weather: [], // 气象
    ammeter: [], // 电表
    battery: [], // 电池

    open: false // 详情
  }

  tabSwitch = (current = 0) => {
    this.setState({ current })
  }
  dTabSwitch = (dCurrent = 0) => {
    this.setState({ dCurrent })
  }
  showDrawer = () => {
    this.setState({ open: true })
  }
  onClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { current, inverters, open, dCurrent } = this.state

    const columns = [
      {
        title: '设备名称/SN',
        width: 200,
        fixed: 'left',
        render: (val) => (
          <div onClick={() => { this.showDrawer() }} style={{ cursor: 'pointer' }}>{val.deviceSn}</div>
        )
      },
      {
        title: '状态',
        width: 100,
        dataIndex: 'equipmentType',
        key: 'equipmentType'
      },
      {
        title: '发电功率(kW)',
        dataIndex: 'power',
        key: 'power',
        width: 150,
      },
      {
        title: '当日发电量(kWh)',
        dataIndex: 'dayElectricity',
        key: 'dayElectricity',
        width: 150,
      },
      {
        title: '当日满发小时(h)',
        dataIndex: 'electricityHour',
        key: 'electricityHour',
        width: 150,
      },
      {
        title: '功率归一化',
        dataIndex: 'deviceId',
        key: 'deviceId',
        width: 150,
      },
      {
        title: '组件容量(kWp)',
        dataIndex: 'volume',
        key: 'volume',
        width: 150,
      },
      {
        title: '所属电站',
        dataIndex: 'stationName',
        key: 'stationName',
        width: 150,
      },
      {
        title: '所属父设备',
        dataIndex: 'deviceSn',
        key: 'deviceSn',
        width: 150,
      },
      {
        title: '父设备状态',
        dataIndex: 'status',
        key: 'status',
        width: 150
      },
      {
        title: '最新更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
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
    const columns1 = [
      {
        title: '直流',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '电压(V)',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: '电流(A)',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '功率(kW)',
        key: 'tags',
        dataIndex: 'tags'
      },
      {
        title: '发电量(kWh)',
        key: 'type',
        dataIndex: 'type'
      }
    ]
    const columns2 = [
      {
        title: '交流',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '电压(V)',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: '电流(A)',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '频率(Hz)',
        key: 'tags',
        dataIndex: 'tags'
      }
    ]
    const data1 = []
    const data2 = []
    return (
      <div className='device'>
        <div style={{ fontSize: 18 }}>设备列表</div>
        <Card style={{ marginTop: 20, fontSize: 12 }} size='small'>
          <div style={{ padding: '0 15px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <span onClick={() => this.tabSwitch(0)} className={current === 0 ? 'cur' : 'nocur'}>逆变器</span>
              <span onClick={() => this.tabSwitch(1)} className={current === 1 ? 'cur' : 'nocur'} style={{ margin: '0 20px' }}>采集器</span>
              <span onClick={() => this.tabSwitch(2)} className={current === 2 ? 'cur' : 'nocur'}>气象站</span>
              <span onClick={() => this.tabSwitch(3)} className={current === 3 ? 'cur' : 'nocur'} style={{ margin: '0 20px' }}>电表</span>
              <span onClick={() => this.tabSwitch(4)} className={current === 4 ? 'cur' : 'nocur'}>电池</span>
            </div>
            <div>
              <SyncOutlined />
            </div>
          </div>
        </Card>
        <Card style={{ height: '79vh' }}>
          { current === 0 ? <Table columns={columns} dataSource={inverters} /> : current === 1 ? '采集器' : current === 2 ? '气象站' : current === 3 ? '电表' : '电池' }
        </Card>

        <Drawer
          placement='right'
          width='80%'
          drawerStyle={{ backgroundColor: '#F2F2F2' }}
          closable={false}
          keyboard={false}
          maskClosable={false}
          mask={false}
          open={open}
          bodyStyle={{ padding: 0 }}
        >
          <div style={{ padding: 15, backgroundColor: '#fff' }}>
            <Row>
              <Col span={8}>
                <div style={{ fontSize: 12 }}>
                  <div>
                    <span>SG50CX(0304NB)</span>
                    <span>A2112701481</span>
                  </div>
                  <div>在线</div>
                  <div>
                    <span onClick={() => this.dTabSwitch(0)} className={dCurrent === 0 ? 'cur' : 'nocur'}>设备详情</span>
                    <span onClick={() => this.dTabSwitch(1)} className={dCurrent === 1 ? 'cur' : 'nocur'} style={{ margin: '0 20px' }}>报警信息</span>
                    <span onClick={() => this.dTabSwitch(2)} className={dCurrent === 2 ? 'cur' : 'nocur'}>连接信息</span>
                    <span onClick={() => this.dTabSwitch(3)} className={dCurrent === 3 ? 'cur' : 'nocur'} style={{ margin: '0 20px' }}>历史数据</span>
                  </div>
                </div>
              </Col>
              <Col span={6} offset={10}>
                col-8
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
                      <Col span={8}>SN号：</Col>
                      <Col span={8}>协议号：</Col>
                      <Col span={8}>产品型号：</Col>
                    </Row>
                    <Row className='fs12'>
                      <Col span={8}>输出方式：</Col>
                      <Col span={8}>额定输出功率(kW)：</Col>
                      <Col span={8}>额定无功输出功率：</Col>
                    </Row>
                  </Card>
                  <Card>
                    <div style={{ fontSize: 16, marginBottom: 20 }}>版本信息</div>
                    <Row className='fs12'>
                      <Col span={8}>版本协议：</Col>
                    </Row>
                  </Card>
                  <Card style={{ margin: '5px 0' }}>
                    <div style={{ fontSize: 16, marginBottom: 20 }}>发电数据</div>
                    <Row className='fs12' gutter={20}>
                      <Col span={10}>
                        <Table columns={columns1} dataSource={data1} size='small' />
                      </Col>
                      <Col span={6}>版本协议：</Col>
                      <Col span={8}>
                        <Table columns={columns2} dataSource={data2} size='small' />
                      </Col>
                    </Row>
                    <Descriptions bordered size='small'>
                      <Descriptions.Item label="当日发电量(有功)(kWh)">Cloud Database</Descriptions.Item>
                      <Descriptions.Item label="当月发电量(有功)(kWh)">Prepaid</Descriptions.Item>
                      <Descriptions.Item label="累计发电量(有功)(kWh)">YES</Descriptions.Item>
                      <Descriptions.Item label="直流输入总功率(kW)">Cloud Database</Descriptions.Item>
                      <Descriptions.Item label="交流输出总有功功率(kW)">Prepaid</Descriptions.Item>
                      <Descriptions.Item label="交流无功总功率(Var)">YES</Descriptions.Item>
                      <Descriptions.Item label="功率因数值">2018-04-24 18:00:00</Descriptions.Item>
                      <Descriptions.Item label="直流离散率" span={1}>2019-04-24 18:00:00</Descriptions.Item>
                    </Descriptions>
                  </Card>
                  <Card>
                    <div style={{ fontSize: 16, marginBottom: 20 }}>温度数据</div>
                    <Row className='fs12'>
                      <Col span={8}>逆变器温度(℃)：</Col>
                    </Row>
                  </Card>
                  <Card style={{ margin: '5px 0' }}>
                    <div style={{ fontSize: 16, marginBottom: 20 }}>其他数据</div>
                    <Row className='fs12'>
                      <Col span={8}>累计运行小时(h)：</Col>
                      <Col span={8}>当日运行分钟(Min)：</Col>
                      <Col span={8}>负极对地电压：</Col>
                    </Row>
                  </Card>
                  <Card>
                    <div style={{ fontSize: 16, marginBottom: 20 }}>状态情况</div>
                    <Row className='fs12'>
                      <Col span={8}>逆变器状态：</Col>
                      <Col span={8}>并联对地电阻：</Col>
                    </Row>
                  </Card>
                </>
              ) : dCurrent === 1 ? '报警信息' : dCurrent === 2 ? '连接信息' : '历史数据'
            }
          </div>
        </Drawer>
      </div>
    )
  }
}
