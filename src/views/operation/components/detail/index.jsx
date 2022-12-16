import React, { Component } from 'react'
import { Card, Drawer, Space, Col, Row } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'

export default class Detail extends Component {
  
  componentDidMount() {
  }
  // 取消 创建/修改
  onClose = () => {
    this.props.closeDetail(false)
  }

  render() {
    const { open, detail } = this.props
    return (
      <Drawer
        title={detail.title}
        placement='right'
        width='70%'
        headerStyle={{backgroundColor: '#FFF'}}
        drawerStyle={{backgroundColor: '#F2F2F2'}}
        closable={false}
        keyboard={false}
        maskClosable={false}
        open={open}
        extra={
          <Space>
            <CloseCircleOutlined onClick={this.onClose} style={{fontSize: 28, color: 'red'}} />
          </Space>
        }
      >
        <Card style={{ marginBottom: 5 }}>
          <h3>维保信息</h3>
          <Row className='fs12' style={{margin: '20px 0 10px 0'}}>
            <Col span={8}>维保时间；{detail.protectTime}</Col>
            <Col span={8}>维保电站：{detail.stationName}</Col>
            <Col span={8}>维保类型：{detail.type === 0 ? '电站' : detail.type === 1 ? '设备' : '其他'}</Col>
          </Row>
          <Row className='fs12'>
            <Col span={8}>创建时间：{detail.createTime}</Col>
            <Col span={8}>更新时间：{detail.updateTime}</Col>
          </Row>
        </Card>
        <Card style={{ marginBottom: 5 }}>
          <h3>维保人</h3>
          {
            detail.ywAdminUserList?.map(item => <span key={item.id} style={{marginRight: 15}}>{item.userName}</span>)
          }
        </Card>
        <Card style={{ marginBottom: 5 }}>
          <h3>维保目标</h3>
          {
            detail.ywStationDeviceList?.map(item => <span key={item.id} style={{marginRight: 15}}>{item.deviceName}{item.deviceSn}</span>)
          }
        </Card>
        <Card style={{ marginBottom: 5 }}>
          <h3>维保内容</h3>
          <div dangerouslySetInnerHTML={{__html: detail.content}}></div>
        </Card>
        <Card style={{ marginBottom: 5 }}>
          <h3>备注</h3>
          <div dangerouslySetInnerHTML={{__html: detail.remark}}></div>
        </Card>
      </Drawer>
    )
  }
}
