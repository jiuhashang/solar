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
    const { open } = this.props
    return (
      <Drawer
        title="项目维保标题"
        placement='right'
        width='70%'
        headerStyle={{ backgroundColor: '#FFF' }}
        drawerStyle={{ backgroundColor: '#F2F2F2' }}
        closable={false}
        keyboard={false}
        maskClosable={false}
        open={open}
        extra={
          <Space>
            <CloseCircleOutlined onClick={this.onClose} style={{ fontSize: 28, color: 'red' }} />
          </Space>
        }
      >
        <Card style={{ marginBottom: 5 }}>
          <h3>维保信息</h3>
          <Row className='fs12' style={{margin: '20px 0 10px 0'}}>
            <Col span={8}>维保时间；</Col>
            <Col span={8}>维保电站：</Col>
            <Col span={8}>维保类型：</Col>
          </Row>
          <Row className='fs12'>
            <Col span={8}>创建时间：</Col>
            <Col span={8}>更新时间：</Col>
          </Row>
        </Card>
        <Card style={{ marginBottom: 5 }}>
          <h3>维保人</h3>

        </Card>
        <Card style={{ marginBottom: 5 }}>
          <h3>维保目标</h3>

        </Card>
        <Card style={{ marginBottom: 5 }}>
          <h3>维保内容</h3>

        </Card>
      </Drawer>
    )
  }
}
