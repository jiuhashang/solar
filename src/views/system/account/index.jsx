// 部门与成员
import React, { Component } from 'react'
import { Card, Button, Row, Col, Drawer, Space, Form, Input, Select, message } from 'antd'
import Stree from './stree'
import Stable from './stable'
import './index.less'
import { getDepartment, addOrUpdateUser } from '../../../api/system'

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
    data: [],
    branch: [], // 部门列表
  }
  
  formRef = React.createRef()
  
  getList = () => {
    getDepartment().then(res => {
      console.log(res)
      this.setState({
        branch: res.data
      })
    })
  }
  // 是否添加新成员
  showDrawer = () => {
    this.setState({
      open: true
    })
  }
  cancle = () => {
    this.formRef.current.resetFields()
    this.setState({
      open: false
    })
  }
  add = () => {
    this.formRef.current.validateFields().then( values => {
      addOrUpdateUser(values).then(res => {
        message.success(res.msg)
      })
      this.formRef.current.resetFields()
      this.setState({
        open: false
      })
    }).catch( err => {})
  }
  onFinish = () => {}
  onFinishFailed = () => {}

  render() {
    const { open, branch } = this.state
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
              <Stable branch={branch} />
            </Card>
          </Col>
        </Row>

        <Drawer
          title="添加成员"
          width='60%'
          onClose={this.onClose}
          closable={false}
          open={open}
          bodyStyle={{paddingBottom: 80}}
          extra={
            <Space>
              <Button onClick={this.cancle}>取消</Button>
              <Button onClick={this.add} type="primary">确定添加</Button>
            </Space>
          }
        >
          <h2>账号信息</h2>
          <div className='info' style={{border: '1px solid #91D5FF', color: '#1890FF', backgroundColor: '#E6F7FF', padding: 5, fontSize: 12}}>登录手机号码以及电子邮箱也将用于相关信息的接收，创建账号的默认密码为123456，创建成功后请联系成员及时修改面貌</div>
          <Form 
            ref={this.formRef}
            layout="vertical"
            style={{marginTop: 20}}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="userName"
                  label="成员姓名"
                  rules={[
                    { required: true, message: '成员姓名必填' }
                  ]}
                >
                  <Input placeholder="请输入成员姓名" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="loginPhone"
                  label="登录手机号码"
                  rules={[
                    { required: true, message: '手机号码必填' }
                  ]}
                >
                  <Input placeholder="请输入手机号码" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="loginName"
                  label="登录用户名"
                  rules={[
                    { required: true, message: '登录用户名必填' }
                  ]}
                >
                  <Input placeholder="请输入登录用户名" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="电子邮箱"
                >
                  <Input placeholder="请输入电子邮箱" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="id"
                  label="所在部门"
                  rules={[
                    { required: true, message: '所在部门必选' }
                  ]}
                >
                  <Select placeholder="请选择所在部门">
                    { branch.map( item => <Option value={item.id} key='id'>{item.name}</Option>) }
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="ruleId"
                  label="权限角色"
                  // rules={[
                  //   { required: true, message: '权限角色必选' }
                  // ]}
                >
                  <Select placeholder="请选择权限角色">
                    <Option value="jack">Jack Ma</Option>
                    <Option value="tom">Tom Liu</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </div>
    )
  }
}
