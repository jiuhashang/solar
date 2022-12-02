import React, { Component } from 'react'
import { Button, Tooltip, Table, Modal, Form, Input, Select, message } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  KeyOutlined
} from '@ant-design/icons'
import { getDepartment, addOrUpdateOne, getUserList } from '../../../../api/system'

const { Item } = Form
const { Option } = Select
export default class Stable extends Component {
  componentDidMount() {
    this.getList()
    this.getUserList()
  }
  state = {
    list: [], // 部门成员列表
    isModalOpen: false
  }

  formRef = React.createRef()

  getList = () => {
    getDepartment().then(res => {
      this.setState({
        branch: res.data
      })
    })
  }
  getUserList = () => {
    getUserList().then(res => {
      // console.log(res);
    })
  }
  add = () => {
    this.setState({
      isModalOpen: true
    })
  }
  edit = () => {
    this.setState({
      isModalOpen: true
    })
  }
  remove = () => {}

  handleOk = () => {
    this.formRef.current.validateFields().then( values => {
      addOrUpdateOne(values).then(res => {
        message.success(res.msg)
      })
      this.setState({
        isModalOpen: false
      })
    }).catch( err => {})
  }
  handleCancel = () => {
    this.formRef.current.resetFields()
    this.setState({
      isModalOpen: false
    })
  }

  render() {
    const columns = [
      {
        title: '成员姓名',
        width: 120,
        dataIndex: 'stationName',
        fixed: 'left',
        ellipsis: true,
        render: stationName => <div>{stationName}</div>
      },
      {
        title: '账号状态',
        width: 100,
        dataIndex: 'connectStatus',
      },
      {
        title: '角色',
        dataIndex: 'wornStatus',
        width: 100,
      },
      {
        title: '部门',
        dataIndex: 'installedCapacity',
        width: 150,
        render: installedCapacity => installedCapacity / 1000
      },
      {
        title: '手机号',
        dataIndex: 'electricPower',
        width: 150,
        render: electricPower => (electricPower / 1000).toFixed(2)
      },
      {
        title: '邮箱',
        dataIndex: 'powerInOne',
        width: 150,
        render: powerInOne => (powerInOne * 100).toFixed(2)
      },
      {
        title: '用户名',
        dataIndex: 'dateElectric',
        width: 130
      },
      {
        title: '最近登录',
        dataIndex: 'electricHour',
        width: 130      
      },
      {
        title: '操作',
        fixed: 'right',
        width: 120,
        render: () => (
          <>
            <Tooltip title="重置密码" color='black'>
              <KeyOutlined style={{ padding: '0 10px 0 10px', cursor: 'pointer' }} />
            </Tooltip>
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
    const { list, isModalOpen } = this.state
    const { branch } = this.props
    return (
      <div className='stable'>
        <div className='top'>
          <h3>西子运维</h3>
          <div>
            <Button type="link" onClick={this.add}>添加部门</Button>
            <Button type="link" onClick={this.edit}>编辑部门</Button>
            <Button danger type="text" onClick={this.remove}>删除</Button>
          </div>
        </div>
        
        <Table rowKey='id' columns={columns} dataSource={list} scroll={{x: 1500}} />

        <Modal title="添加部门"
          open={isModalOpen}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            ref={this.formRef}
            name='basic'
            layout='vertical'
            initialValues={{
              name: '',
              parentId: ''
            }}
            autoComplete='off'
          >
            <Item
              label="部门名称"
              name="name"
              rules={[
                { required: true, message: '部门名称必填' }
              ]}
            >
              <Input placeholder='请输入部门名称' />
            </Item>

            <Item
              label="选择所属上级部门"
              name="parentId"
              rules={[
                { required: true, message: '所属上级部门必选' }
              ]}
            >
              <Select
                placeholder="请选择所属上级部门"
                // onChange={this.onGenderChange}
                allowClear
              >
                { branch.map( item => <Option value={item.parentId} key='id'>{item.name}</Option>) }
              </Select>
            </Item>
          </Form>
      </Modal>
      </div>
    )
  }
}
