// 采集器
import React, { Component } from 'react'
import { Card, Tooltip, Table, Drawer, Row, Col, Descriptions } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined
} from '@ant-design/icons'

import { getDeviceList, getDeviceDetail } from '../../../../../../api/monitoring'

export default class Collector extends Component {
  componentDidMount() {
    this.getDeviceList() // 获取采集器列表
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
    collectors: {},
    open: false,
    deviceId: undefined,
    deviceName: undefined,
    status: undefined,
    collectorInfo: {}
  }

   // 获取采集器列表
   getDeviceList = (pageIndex=1, pageSize=10) => {
    const stationId = window.sessionStorage.getItem('stationId')
    const deviceForm = {
      stationId,
      deviceType: 1,
      pageIndex,
      pageSize
    }
    getDeviceList(deviceForm).then(res => {
      const result = res.data
      const obj = {
        current: result.current,
        pageSize: result.size,
        total: result.total,
        collector: result.records
      }
      this.setState({
        collectors: obj
      })
    })
  }
  // 获取采集器详情
  showDrawer = (row) => {
    getDeviceDetail({ deviceId: row.id }).then(res => {
      // console.log(res)
      let obj = {}
      res.data.forEach(item => {
        obj[item.keyName] = item.valueName
      })
      this.setState({
        collectorInfo: {...obj}
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
    const { collectors: {collector,total,current}, open, dCurrent, deviceName, deviceId, status, collectorInfo } = this.state
    const columns = [
      {
        title: '设备名称/SN',
        width: 200,
        fixed: 'left',
        render: val => (
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
          val.status === 0 ? <MinusCircleOutlined style={{ color: '#8C8C8C' }} />: val.status === 1 ?
          <CheckCircleOutlined style={{ color: '#41D068' }} /> : 
          <CloseCircleOutlined style={{ color: 'red' }} />
      },
      {
        title: '所属电站',
        dataIndex: 'stationName',
        key: 'stationName',
        width: 400,
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
    return (
      <>
        <Table columns={columns} rowKey={(record) => record.id} dataSource={collector} 
          pagination={{
            defaultCurrent: 1,
            defaultPageSize: 10,
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
                      <Col span={8}>内置设备SN：{collectorInfo.SN1}</Col>
                    </Row>
                  </Card>
                  <Card>
                    <div style={{ fontSize: 16, marginBottom: 20 }}>版本信息</div>
                    <Descriptions bordered size='small'>
                      <Descriptions.Item label="模块版本号">{collectorInfo.MDUv1}</Descriptions.Item>
                      <Descriptions.Item label="配置状态">{collectorInfo.ST_CONF1}</Descriptions.Item>
                      <Descriptions.Item label="配置次数">{collectorInfo.NUM_CONF1}</Descriptions.Item>
                    </Descriptions>
                  </Card>
                  <Card style={{ margin: '5px 0' }}>
                    <div style={{ fontSize: 16, marginBottom: 20 }}>实时信息</div>
                    <Descriptions bordered size='small'>
                      <Descriptions.Item label="总工作时间(s)">{collectorInfo.WORK_TIM1}</Descriptions.Item>
                      <Descriptions.Item label="偏移时间(s)">{collectorInfo.OFFSET_TIM1}</Descriptions.Item>
                      <Descriptions.Item label="数据上传周期(Min)">{collectorInfo.SEND_PERIOD1}</Descriptions.Item>
                      <Descriptions.Item label="数据采集周期(s)">{collectorInfo.COLLECT_PERIOD1}</Descriptions.Item>
                      <Descriptions.Item label="最大连接台数">{collectorInfo.max_conn_n1}</Descriptions.Item>
                      <Descriptions.Item label="ICCID/ESN">{collectorInfo.ICCID1}</Descriptions.Item>
                      <Descriptions.Item label="运营商名称">{collectorInfo.OPOR_NM1}</Descriptions.Item>
                      <Descriptions.Item label="基站ID">{collectorInfo.BS_ID1}</Descriptions.Item>
                      <Descriptions.Item label="信号强度">{collectorInfo.SGits1}</Descriptions.Item>
                      <Descriptions.Item label="心跳频率(s)">{collectorInfo.HEA_F1}</Descriptions.Item>
                      <Descriptions.Item label="采集器累计发送的帧数">{collectorInfo.SENDt_n1}</Descriptions.Item>
                      <Descriptions.Item label="采集器累计接收的帧数">{collectorInfo.REVt_n1}</Descriptions.Item>
                      <Descriptions.Item label="GSM/WCDMA基站定位信息LAC">{collectorInfo.BS_LAC1}</Descriptions.Item>
                      <Descriptions.Item label="蓝牙状态">{collectorInfo.Btooth_ST1}</Descriptions.Item>
                      <Descriptions.Item label="APN导入状态">{collectorInfo.APN_Leadin_ST1}</Descriptions.Item>
                      <Descriptions.Item label="APN导入文件名">{collectorInfo.APN_Leadin_File_N1}</Descriptions.Item>
                      <Descriptions.Item label="GPRS工作模式">{collectorInfo.GPRS_work_mode}</Descriptions.Item>
                      <Descriptions.Item label="扩展功能">{collectorInfo.Extend_fun}</Descriptions.Item>
                      <Descriptions.Item label="支持IV曲线">{collectorInfo.IV_curve}</Descriptions.Item>
                      <Descriptions.Item label="支持批量指令">{collectorInfo.Bath_Command}</Descriptions.Item>
                      <Descriptions.Item label="支持升级进度上报">{collectorInfo.S_R_U_P}</Descriptions.Item>
                      <Descriptions.Item label="支持AT+UPGRADE指令">{collectorInfo.ATUPCMD}</Descriptions.Item>
                      <Descriptions.Item label="支持数据块透传">{collectorInfo.SDBTT}</Descriptions.Item>
                      <Descriptions.Item label="扩展功能2">{collectorInfo.EF2}</Descriptions.Item>
                      <Descriptions.Item label="升级协议方式">{collectorInfo.MOPU}</Descriptions.Item>
                    </Descriptions>
                  </Card>
                </>
              ) : dCurrent === 1 ? '报警信息' : '连接信息'
            }
          </div>
        </Drawer>
      </>
    )
  }
}
