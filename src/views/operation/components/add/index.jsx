import React, { Component } from 'react'
import { Card, Drawer, Form, Input, Space, Select, Button, Col, Row, DatePicker } from 'antd'
import RichTextEditor from '../editor'
// import './index.less'

const { Item } = Form
const { Option } = Select
export default class AddForm extends Component {
  contentRef = React.createRef()
  remarkRef = React.createRef()
  state = {
    open: true,
    options: []
  }
  componentDidMount() {
  }
  // 取消 创建/修改
  onClose = () => {
    this.props.closeDrawer(false)
  }
  handleChange = () => { }

  render() {
    const { open, options } = this.props
    return (
      <Drawer
        title="添加维保记录"
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
            <Button type="primary" onClick={this.add}>创建</Button>
          </Space>
        }
      >
        <Form
          name="basic"
          ref='form'
          layout="vertical"
          className='add-form'
        >
          <Card style={{ marginBottom: 5 }}>
            <h3>维保信息</h3>

            <Item label="维保标题" name="title"
              rules={[
                { required: true, message: '请输入维保标题' }
              ]}
            >
              <Input placeholder='请输入维保标题' />
            </Item>
            <Item label="维保成员" name='ywStationProtectUserList'
              rules={[
                { required: true, message: '请选择维保成员' }
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                placeholder="请选择维保人员"
                onChange={this.handleChange}
                options={options}
              />
            </Item>
            <Item label="维保电站" name="stationName"
              rules={[
                { required: true, message: '请选择维保电站' }
              ]}
            >
              <Select
                allowClear
                placeholder="请选择维保电站"
                onChange={this.handleChange}
                options={options}
              />
            </Item>
            <Row gutter={20}>
              <Col span={6}>
                <Item label="维保类型" name='type'
                  rules={[
                    { required: true, message: '请选择维保类型' }
                  ]}
                >
                  <Select
                  // onChange={handleChange}
                  >
                    <Option value={0}>电站</Option>
                    <Option value={1}>设备</Option>
                    <Option value={2}>其他</Option>
                  </Select>
                </Item>
              </Col>
              <Col span={18}>
                <Item label="维保目标" name='protectTarget'
                  rules={[
                    { required: true, message: '请选择设备' }
                  ]}
                >

                </Item>
              </Col>
            </Row>
            <Item label="维保时间" name='protectTime'
              rules={[
                { required: true, message: '请选择维保时间' }
              ]}
            >
              <DatePicker showTime onChange={this.onChange} onOk={this.onOk} style={{ width: '24%' }} />
            </Item>
            <Item label="维保内容" name='content'
              rules={[
                { required: true, message: '请填写维保内容' }
              ]}
            >
              <RichTextEditor ref={this.contentRef}  />
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
