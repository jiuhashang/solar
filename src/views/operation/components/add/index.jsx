import React, { Component } from 'react'
import { Card, Drawer, Form, Input, Space, Select, Button, Col, Row, DatePicker, message } from 'antd'
import RichTextEditor from '../editor'
import { getAllUserList, getAllStationList, getAllDeviceList, addOrUpdateOne } from '../../../../api/operation'
import moment from 'moment/moment'
// import './index.less'

const { Item } = Form
const { Option } = Select
export default class AddForm extends Component {
  formRef = React.createRef()
  contentRef = React.createRef()
  remarkRef = React.createRef()
  state = {
    open: true,
    userOptions: [],
    stationOptions: [],
    deviceOptions: [],
    stationId: undefined, // 选中的电站id
    stationName: undefined, // 选中的电站名称
    type: 0,
  }
  componentDidMount() {
    this.getAllUserList()
    this.getAllStationList()
  }
  // 获取全部人员列表
  getAllUserList = () => {
    getAllUserList().then(res => {
      this.setState({
        userOptions: res.data
      })
    })
  }
  // 获取全部电站列表
  getAllStationList = () => {
    getAllStationList().then(res => {
      this.setState({
        stationOptions: res.data
      })
    })
  }
  // 取消 创建/修改
  onClose = () => {
    this.props.closeDrawer(false)
  }
  // 创建/修改
  add = () => {
    const { stationId, protectTime } = this.formRef.current.getFieldsValue()
    const stationName = this.state.stationOptions.find(item => stationId === item.id).stationName
    const content = this.contentRef.current.getDetail()
    const remark = this.contentRef.current.getDetail()
    this.formRef.current.validateFields().then(values => {
      console.log(values)
      if (values.type === 0) {
        values.protectTarget = stationName
      }
      values.stationName= stationName
      values.content = content
      values.protectTime = moment(protectTime).format('YYYY-MM-DD HH:mm:ss')
      values.remark = remark
      values.protectUser = values.protectUser.join(',')
      values.protectTarget = values.protectTarget.join(',')
      // return
      addOrUpdateOne(values).then(res => {
        console.log(res)
        if (res.code === 0) {
          message.success(res.msg)
          this.setState({
            open: false
          })
          this.formRef.current.resetFields()
        } else {
          message.error(res.msg)
        }
      })
    }).catch(err => { })
  }
  // 维保电站选择
  handleStationChange = (value, options) => {
    this.setState({
      stationId: value,
      stationName: options.children
    }, () => {
      // 获取对应电站所有设备列表
      getAllDeviceList({ stationId: value }).then(res => {
        this.setState({
          deviceOptions: res.data
        })
      })
    })
  }
  // 维保类型选择
  handleTypeChange = (value) => {
    this.setState({
      type: value
    })
  }
  render() {
    const { open , row } = this.props
    console.log(row);
    this.state.stationId = row.stationId
    const { userOptions, stationOptions, deviceOptions, type, stationId, stationName } = this.state
    return (
      <Drawer
        title={`${row.id ? '修改' : '添加'}维保记录`}
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
            <Button onClick={this.onClose}>取消</Button>
            <Button type="primary" onClick={this.add}>{row.id ? '修改' : '创建'}</Button>
          </Space>
        }
      >
        <Form
          name="basic"
          ref={this.formRef}
          layout="vertical"
          initialValues={{
            title: row.title,
            protectUser: row.ywAdminUserList,
            stationId: row.stationId,
            protectTarget: row.stationName,
            type,
            protectTime: moment(row.protectTime),
            // content: row.content,
            // remark: row.remark
          }}
        >
          <Card style={{marginBottom: 5}}>
            <h3>维保信息</h3>
            <Item label="维保标题" name="title"
              rules={[
                { required: true, message: '请输入维保标题' }
              ]}
            >
              <Input placeholder='请输入维保标题' />
            </Item>
            <Item label="维保成员" name='protectUser'
              rules={[
                { required: true, message: '请选择维保成员' }
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                placeholder="请选择维保人员"
              >
                {userOptions.map(item => (<Option value={item.id} key={item.id}>{item.userName}</Option>))}
              </Select>
            </Item>
            <Item label="维保电站" name="stationId"
              rules={[
                { required: true, message: '请选择维保电站' }
              ]}
            >
              <Select
                allowClear
                placeholder="请选择维保电站"
                onChange={this.handleStationChange}
              >
                {stationOptions.map(item => <Option value={item.id} key={item.id}>{item.stationName}</Option>)}
              </Select>
            </Item>
            {
              stationId ? (
                <Row gutter={20}>
                  <Col span={6}>
                    <Item label="维保类型" name='type'
                      rules={[
                        { required: true, message: '请选择维保类型' }
                      ]}
                    >
                      <Select
                        onChange={this.handleTypeChange}
                      >
                        <Option value={0}>电站</Option>
                        <Option value={1}>设备</Option>
                        <Option value={2}>其他</Option>
                      </Select>
                    </Item>
                  </Col>
                  <Col span={18}>
                    {
                      type === 0 && stationId ? (
                        <Item label="维保目标" name='protectTarget'
                          // rules={[
                          //   { required: true, message: '请选择电站' }
                          // ]}
                        >
                          <Input placeholder='请选择电站' defaultValue={stationName} key={stationName} disabled />
                        </Item>
                      ) : type === 1 && stationId ? (
                        <Item label="维保目标" name='protectTarget'
                          rules={[
                            { required: true, message: '请选择设备' }
                          ]}
                        >
                          <Select
                            mode="multiple"
                            allowClear
                            placeholder="请选择维保设备列表"
                            onChange={this.handleDeviceChange}
                          >
                            {deviceOptions.map(item => <Option value={item.id} key={item.id}>{item.deviceName} {item.deviceSn}</Option>)}
                          </Select>
                        </Item>) : (
                        <Item label="维保目标" name='protectTarget'
                          rules={[
                            { required: true, message: '请输入内容' }
                          ]}
                        >
                          <Input placeholder='请输入相关内容' />
                        </Item>
                      )
                    }
                  </Col>
                </Row>
              ) : null
            }
            <Item label="维保时间" name='protectTime'
              rules={[
                { required: true, message: '请选择维保时间' }
              ]}
            >
              <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' style={{ width: '24%' }} />
            </Item>
            <Item label="维保内容" name='content'
              // rules={[
              //   { required: true, message: '请填写维保内容' }
              // ]}
            >
              <RichTextEditor ref={this.contentRef} />
            </Item>
            <Item label="备注" name='remark'>
              <RichTextEditor ref={this.remarkRef} />
            </Item>
          </Card>
        </Form>
      </Drawer>
    )
  }
}
