// 部门与成员
import React, { Component } from 'react'
import { Card, Button, Row, Col, Drawer, Space, Form, Input, Select, DatePicker, Alert } from 'antd'
import { getDepartment } from '../../../api/system'
import Stree from './stree'
import Stable from './stable'
import './index.less'

const { Option } = Select;
export default class Account extends Component {
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
    getDepartment().then(res => {
      // console.log(res)
    })
  }
  // 是否添加新成员
  showDrawer = () => {
    this.setState({
      open: true
    })
  }
  onClose = () => {}

  render() {
    const { open } = this.state
    return (
      <div className='account'>
        <div className='top'>
          <div style={{ fontSize: 18, fontWeight: 'bold' }}>部门与成员</div>
          <div>
            <Button type="primary" onClick={this.showDrawer}>添加新成员</Button>
          </div>
        </div>
        <Row style={{marginTop: 20}}>
          <Col span={7}>
            <Card className='vh'>
              <Stree />
            </Card>
          </Col>
          <Col span={17}>
            <Card className='vh'>
              <Stable />
            </Card>
          </Col>
        </Row>

        <Drawer
          width='60%'
          onClose={this.onClose}
          open={open}
          bodyStyle={{
            paddingBottom: 80,
          }}
          extra={
            <Space>
              <Button onClick={this.onClose}>取消</Button>
              <Button onClick={this.onClose} type="primary">确定添加</Button>
            </Space>
          }
        >
          <h2>账号信息</h2>
          <Alert message="登录手机号码以及电子邮箱也将用于相关信息的接收，创建账号的默认密码为123456，创建成功后请联系成员及时修改面貌" type="info" />
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter user name',
                    },
                  ]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="url"
                  label="Url"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter url',
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: '100%',
                    }}
                    addonBefore="http://"
                    addonAfter=".com"
                    placeholder="Please enter url"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="owner"
                  label="Owner"
                  rules={[
                    {
                      required: true,
                      message: 'Please select an owner',
                    },
                  ]}
                >
                  <Select placeholder="Please select an owner">
                    <Option value="xiao">Xiaoxiao Fu</Option>
                    <Option value="mao">Maomao Zhou</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the type',
                    },
                  ]}
                >
                  <Select placeholder="Please choose the type">
                    <Option value="private">Private</Option>
                    <Option value="public">Public</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="approver"
                  label="Approver"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the approver',
                    },
                  ]}
                >
                  <Select placeholder="Please choose the approver">
                    <Option value="jack">Jack Ma</Option>
                    <Option value="tom">Tom Liu</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dateTime"
                  label="DateTime"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the dateTime',
                    },
                  ]}
                >
                  <DatePicker.RangePicker
                    style={{
                      width: '100%',
                    }}
                    getPopupContainer={(trigger) => trigger.parentElement}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'please enter url description',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="please enter url description" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </div>
    )
  }
}
