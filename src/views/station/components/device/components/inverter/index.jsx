// 逆变器
import React, { Component } from 'react'
import { Card, Tooltip, Table, Drawer, Row, Col, Descriptions } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined
} from '@ant-design/icons'
import Chart from '../../components/chart'

import { getDeviceList, getDeviceDetail } from '../../../../../../api/monitoring'

export default class Inverter extends Component {
  componentDidMount() {
    this.getDeviceList() // 获取逆变器列表
  }
  state = {
    dCurrent: 0,
    id: undefined,
    deviceForm: {
      stationId: undefined,
      deviceType: 0,
      pageIndex: 1,
      pageSize: 10
    },
    inverters: {},
    open: false,
    status: undefined,
    deviceId: undefined,
    deviceName: undefined,
    inverterInfo: {
      SN1: '',
      PTC_NUM1: '',
      PM1: '',
      MODEo1: '',
      P_ro1: '',
      RORP: '',
      PTCv1: '', // 协议
      dv: [],
      dc: [],
      dp: [],
      de: [],
      av: [],
      ac: [],
      hz: [],
      Etdy_ge1: '',
      Emon1: '',
      Et_ge0: '',
      DPi_t1: '',
      APo_t1: '',
      A_Qt1: '',
      FV_P: '',
      _dispersion: '',
      INV_T0: '', // 逆变器温度
      t_w_hou1: '',
      D_RT_M: '',
      V_Cg1: '',
      INV_ST1: '',
      I_EARipa1: ''
    }
  }
  // 获取逆变器列表
  getDeviceList = (pageIndex=1, pageSize=10) => {
    const stationId = window.sessionStorage.getItem('stationId')
    const deviceForm = {
      stationId,
      deviceType: 0,
      pageIndex,
      pageSize
    }
    getDeviceList(deviceForm).then(res => {
      const result = res.data
      const obj = {
        current: result.current,
        pageSize: result.size,
        total: result.total,
        inverter: result.records
      }
      this.setState({
        inverters: obj
      })
    })
  }
  // 获取逆变器详情
  showDrawer = (row) => {
    getDeviceDetail({ deviceId: row.id }).then(res => {
      // console.log(res)
      res.data.forEach(item => {
        const { inverterInfo } = this.state
        if (item.keyName === 'SN1') {
          inverterInfo.SN1 = item.valueName
          this.setState({
            'inverterInfo.SN1': inverterInfo.SN1
          })
        } else if (item.keyName === 'PTC_NUM1') {
          inverterInfo.PTC_NUM1 = item.valueName
          this.setState({
            'inverterInfo.PTC_NUM1': inverterInfo.PTC_NUM1
          })
        } else if (item.keyName === 'PM1') {
          inverterInfo.PM1 = item.valueName
          this.setState({
            'inverterInfo.PM1': inverterInfo.PM1
          })
        } else if (item.keyName === 'MODEo1') {
          inverterInfo.MODEo1 = item.valueName
          this.setState({
            'inverterInfo.MODEo1': inverterInfo.MODEo1
          })
        } else if (item.keyName === 'P_ro1') {
          inverterInfo.P_ro1 = item.valueName
          this.setState({
            'inverterInfo.P_ro1': inverterInfo.P_ro1
          })
        } else if (item.keyName === 'RORP') {
          inverterInfo.RORP = item.valueName
          this.setState({
            'inverterInfo.RORP': inverterInfo.RORP
          })
        } else if (item.keyName === 'DPi_t1') {
          inverterInfo.DPi_t1 = item.valueName
          this.setState({
            'inverterInfo.DPi_t1': inverterInfo.DPi_t1
          })
        } else if (item.keyName === 'PTCv1') { // 
          inverterInfo.PTCv1 = item.valueName
          this.setState({
            'inverterInfo.PTCv1': inverterInfo.PTCv1
          })
        } else if (item.keyName.indexOf('DV') !== -1) {
          this.state.inverterInfo.dv.push(item)
        } else if (item.keyName.indexOf('DC') !== -1) {
          this.state.inverterInfo.dc.push(item)
        } else if (item.keyName.indexOf('DP') !== -1) {
          this.state.inverterInfo.dp.push(item)
        } else if (item.keyName.indexOf('DE') !== -1) {
          this.state.inverterInfo.de.push(item)
        } else if (item.keyName.indexOf('AV') !== -1) {
          this.state.inverterInfo.av.push(item)
        } else if (item.keyName.indexOf('AC') !== -1) {
          this.state.inverterInfo.ac.push(item)
        } else if (item.keyName.indexOf('A_F') !== -1) {
          this.state.inverterInfo.hz.push(item)
        } else if (item.keyName === 'Etdy_ge1') { // 
          inverterInfo.Etdy_ge1 = item.valueName
          this.setState({
            'inverterInfo.Etdy_ge1': inverterInfo.Etdy_ge1
          })
        } else if (item.keyName === 'Emon1') {
          inverterInfo.Emon1 = item.valueName
          this.setState({
            'inverterInfo.Emon1': inverterInfo.Emon1
          })
        } else if (item.keyName === 'Et_ge0') {
          inverterInfo.Et_ge0 = item.valueName
          this.setState({
            'inverterInfo.Et_ge0': inverterInfo.Et_ge0
          })
        } else if (item.keyName === 'APo_t1') {
          inverterInfo.APo_t1 = item.valueName
          this.setState({
            'inverterInfo.APo_t1': inverterInfo.APo_t1
          })
        } else if (item.keyName === 'A_Qt1') {
          inverterInfo.A_Qt1 = item.valueName
          this.setState({
            'inverterInfo.A_Qt1': inverterInfo.A_Qt1
          })
        } else if (item.keyName === 'FV_P') {
          inverterInfo.FV_P = item.valueName
          this.setState({
            'inverterInfo.FV_P': inverterInfo.FV_P
          })
        } else if (item.keyName === '_dispersion') {
          inverterInfo._dispersion = item.valueName
          this.setState({
            'inverterInfo._dispersion': inverterInfo._dispersion
          })
        } else if (item.keyName === 'INV_T0') {
          inverterInfo.INV_T0 = item.valueName
          this.setState({
            'inverterInfo.INV_T0': inverterInfo.INV_T0
          })
        } else if (item.keyName === 't_w_hou1') {
          inverterInfo.t_w_hou1 = item.valueName
          this.setState({
            'inverterInfo.t_w_hou1': inverterInfo.t_w_hou1
          })
        } else if (item.keyName === 'D_RT_M') {
          inverterInfo.D_RT_M = item.valueName
          this.setState({
            'inverterInfo.D_RT_M': inverterInfo.D_RT_M
          })
        } else if (item.keyName === 'V_Cg1') {
          inverterInfo.V_Cg1 = item.valueName
          this.setState({
            'inverterInfo.V_Cg1': inverterInfo.V_Cg1
          })
        } else if (item.keyName === 'INV_ST1') {
          inverterInfo.INV_ST1 = item.valueName
          this.setState({
            'inverterInfo.INV_ST1': inverterInfo.INV_ST1
          })
        } else if (item.keyName === 'I_EARipa1') {
          inverterInfo.I_EARipa1 = item.valueName
          this.setState({
            'inverterInfo.I_EARipa1': inverterInfo.I_EARipa1
          })
        }
      })
    })
    this.setState({
      open: true,
      id: row.id,
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
    const { id, inverters: { inverter, total, current }, open, deviceName, deviceId, status, dCurrent, inverterInfo } = this.state
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
        title: '发电功率(kW)',
        // dataIndex: 'power',
        // key: 'power',
        width: 150,
        render: val => val.power/1000
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
        dataIndex: 'iii',
        key: 'iii',
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
        width: 220,
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
    return (
      <>
        <Table columns={columns} rowKey={(record) => record.id} dataSource={inverter}
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
                      <Col span={8}>SN号：{inverterInfo.SN1}</Col>
                      <Col span={8}>协议号：{inverterInfo.PTC_NUM1}</Col>
                      <Col span={8}>产品型号：{inverterInfo.PM1}</Col>
                    </Row>
                    <Row className='fs12'>
                      <Col span={8}>输出方式：{inverterInfo.MODEo1}</Col>
                      <Col span={8}>额定输出功率(kW)：{inverterInfo.P_ro1 / 1000}</Col>
                      <Col span={8}>额定无功输出功率：{inverterInfo.RORP}</Col>
                    </Row>
                  </Card>
                  <Card>
                    <div style={{ fontSize: 16, marginBottom: 20 }}>版本信息</div>
                    <Row className='fs12'>
                      <Col span={8}>版本协议：{inverterInfo.PTCv1}</Col>
                    </Row>
                  </Card>
                  <Card style={{ margin: '5px 0' }}>
                    <div style={{ fontSize: 16, marginBottom: 20 }}>发电数据</div>
                    <Row className='fs12' gutter={20}>
                      <Col span={10} style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 10 }}>
                        <div style={{ textAlign: 'center' }}>
                          <div>直流</div>
                          {inverterInfo.dv.map((item, index) => {
                            return <div key={item.id} className='mtb5'>PV{index + 1}</div>
                          })}
                        </div>

                        <div style={{ textAlign: 'center' }}>
                          <div>电压(V)</div>
                          {inverterInfo.dv.map(item => {
                            return <div key={item.id} className='mtb5'>{item.valueName}</div>
                          })}
                        </div>

                        <div style={{ textAlign: 'center' }}>
                          <div>电流(A)</div>
                          {inverterInfo.dc.map(item => {
                            return <div key={item.id} className='mtb5'>{item.valueName}</div>
                          })}
                        </div>

                        <div style={{ textAlign: 'center' }}>
                          <div>功率(kW)</div>
                          {inverterInfo.dp.map(item => {
                            return <div key={item.id} className='mtb5'>{(item.valueName / 1000).toFixed(5)}</div>
                          })}
                        </div>

                        <div style={{ textAlign: 'center' }}>
                          <div>发电量(kWh)</div>
                          {inverterInfo.de.map(item => {
                            return <div key={item.id} className='mtb5'>{item.valueName}</div>
                          })}
                        </div>
                      </Col>
                      <Col span={6}></Col>
                      <Col span={8} style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 10 }}>
                        <div style={{ textAlign: 'center' }}>
                          <div>交流</div>
                          <div className='mtb5'>R</div>
                          <div className='mtb5'>S</div>
                          <div className='mtb5'>T</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div>电压(V)</div>
                          {inverterInfo.av.map(item => {
                            return <div key={item.id} className='mtb5'>{item.valueName}</div>
                          })}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div>电流(A)</div>
                          {inverterInfo.ac.map(item => {
                            return <div key={item.id} className='mtb5'>{item.valueName}</div>
                          })}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div>频率(Hz)</div>
                          {inverterInfo.hz.map(item => {
                            return <div key={item.id} className='mtb5'>{item.valueName}</div>
                          })}
                        </div>
                      </Col>
                    </Row>
                    <Descriptions bordered size='small'>
                      <Descriptions.Item label="当日发电量(有功)(kWh)">{inverterInfo.Etdy_ge1}</Descriptions.Item>
                      <Descriptions.Item label="当月发电量(有功)(kWh)">{inverterInfo.Emon1}</Descriptions.Item>
                      <Descriptions.Item label="累计发电量(有功)(kWh)">{inverterInfo.Et_ge0}</Descriptions.Item>
                      <Descriptions.Item label="直流输入总功率(kW)">{inverterInfo.DPi_t1 / 1000}</Descriptions.Item>
                      <Descriptions.Item label="交流输出总有功功率(kW)">{inverterInfo.APo_t1 / 1000}</Descriptions.Item>
                      <Descriptions.Item label="交流无功总功率(Var)">{inverterInfo.A_Qt1}</Descriptions.Item>
                      <Descriptions.Item label="功率因数值">{inverterInfo.FV_P}</Descriptions.Item>
                      <Descriptions.Item label="直流离散率" span={1}>{inverterInfo._dispersion}</Descriptions.Item>
                    </Descriptions>
                  </Card>
                  <Card>
                    <div style={{ fontSize: 16, marginBottom: 20 }}>温度数据</div>
                    <Row className='fs12'>
                      <Col span={8}>逆变器温度(℃)：{inverterInfo.INV_T0}</Col>
                    </Row>
                  </Card>
                  <Card style={{ margin: '5px 0' }}>
                    <div style={{ fontSize: 16, marginBottom: 20 }}>其他数据</div>
                    <Row className='fs12'>
                      <Col span={8}>累计运行小时(h)：{inverterInfo.t_w_hou1}</Col>
                      <Col span={8}>当日运行分钟(Min)：{inverterInfo.D_RT_M}</Col>
                      <Col span={8}>负极对地电压：{inverterInfo.V_Cg1}</Col>
                    </Row>
                  </Card>
                  <Card>
                    <div style={{ fontSize: 16, marginBottom: 20 }}>状态情况</div>
                    <Row className='fs12'>
                      <Col span={8}>逆变器状态：{inverterInfo.INV_ST1}</Col>
                      <Col span={8}>并联对地电阻：{inverterInfo.I_EARipa1}</Col>
                    </Row>
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
