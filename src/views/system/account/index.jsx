// 部门与成员
import React, { Component } from 'react'
import { Card, Button, Tree, Tag, Table, TreeSelect, Tooltip, Row, Col, Drawer, Space, Form, Input, Select, Modal, message } from 'antd'
import {
  EditOutlined,
  UnlockOutlined,
  KeyOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import './index.less'
import { getDepartment, getUserList, addOrUpdateUser, addOrUpdateOne, deleteOne, resetPwd } from '../../../api/system'

const { Option } = Select
const { Item } = Form
const { confirm } = Modal
export default class Account extends Component {
  componentDidMount() {
    this.getList()
    this.getUserList()
  }
  state = {
    open: false,
    treeData: [], // 全部 部门列表
    tree: null, // 部分 部门列表

    list: [], // 部门成员列表
    isModalOpen: false,
    departmentId: 0,
    pageIndex: 1,
    pageSize: 10,
    total: 0,

    isPwdModalOpen: false, // 重置密码弹框
  }

  formRef = React.createRef()
  pwdRef = React.createRef()

  // 获取部门列表
  getList = () => {
    getDepartment().then(res => {
      // console.log(res);
      this.setState({
        treeData: res.data,
        tree: res.data
      })
    })
  }
  // 获取部门人员列表
  getUserList = () => {
    const { departmentId, pageIndex, pageSize } = this.state
    const obj = { departmentId, pageIndex, pageSize }
    getUserList(obj).then(res => {
      // console.log(res)
      this.setState({
        list: res.data.records,
        total: res.data.total
      })
    })
  }

  // 添加新成员弹框
  showDrawer = () => {
    this.user = null
    this.setState({
      open: true
    })
  }
  // 修改成员弹框
  editUser = row => {
    this.user = row
    this.setState({
      open: true
    })
  }
  // 取消添加成员
  cancle = () => {
    this.formRef.current.resetFields()
    this.setState({
      open: false
    })
  }
  // 添加/编辑 成员
  addUser = () => {
    this.formRef.current.validateFields().then(values => {
      if (this.user) {
        values.id = this.user.id
      }
      addOrUpdateUser(values).then(res => {
        message.success(res.msg)
        this.getUserList()
        this.getList()
        this.formRef.current.resetFields()
        this.setState({
          open: false
        })
      })
    }).catch(err => { })
  }
  // 禁/启用成员
  enableUser = row => {
    confirm({
      title: `${row.status === 0 ? '禁用' : '启用'}后，该账号${row.status === 0 ? '将无法登录' : '可正常登录'}，是否继续${row.status === 0 ? '禁用' : '启用'}?`,
      icon: <ExclamationCircleOutlined />,
      onOk: () => { 
        if (row.status === 0) {
          row.status = 1
        } else {
          row.status = 0
        }
        addOrUpdateUser(row).then(res => {
          message.success(res.msg)
          this.getUserList()
        })
      }
    })
  }
  // 重置密码
  updatePwd = row => {
    this.id = row.id
    this.setState({
      isPwdModalOpen: true
    })
  }
  handlePwdOk = () => {
    this.pwdRef.current.validateFields().then(values => {
      values.id = this.id
      resetPwd(values).then(res => {
        message.success(res.msg)
        this.pwdRef.current.resetFields()
        this.id = null
        this.setState({
          isPwdModalOpen: false
        })
      })
    }).catch(err => { })
  }
  handlePwdCancel = () => {
    this.pwdRef.current.resetFields()
    this.id = null
    this.setState({
      isPwdModalOpen: false
    })
  }

  // 部门
  // 添加 部门弹框
  addDepart = () => {
    this.branch = null
    this.setState({
      isModalOpen: true
    })
  }
  // 编辑 部门弹框
  editDepart = () => {
    this.branch = this.state.tree
    this.setState({
      isModalOpen: true
    })
  }
  // 删除当前部门
  remove = () => {
    confirm({
      title: '是否删除该部门?',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        deleteOne({departmentId: this.state.tree.id}).then(res => {
          message.success(res.msg)
          this.getList()
        })
      }
    })
    
  }

  // 确认 添加/编辑 部门
  handleOk = () => {
    this.formRef.current.validateFields().then(values => {
      if (this.branch) {
        values.id = this.branch.id
      }
      addOrUpdateOne(values).then(res => {
        message.success(res.msg)
        this.getUserList()
        this.getList()
      })
      this.setState({
        isModalOpen: false
      })
    }).catch(err => {})
  }
  // 取消 添加/编辑 部门 弹框
  handleCancel = () => {
    this.setState({
      isModalOpen: false
    })
  }
  // 所选中的部门列表
  onSelect = (selectedKeys, info) => {
    this.setState({
      tree: info.node,
      departmentId: info.node.id
    }, () => { this.getUserList() })
  }

  // 修改tree展示样式
  treeData = data => {
    const list = []
    data.forEach(item => {
      const treeNode = {
        ...item,
        title: `${item.name}  (${item.lowerNum})`,
        key: item.id
      }
      if(item.ywDepartmentInfoList.length > 0) {
        treeNode.children = this.treeData(item.ywDepartmentInfoList)
      }
      list.push(treeNode)
    })
    return list
  }

  render() {
    const { open, treeData, tree, list, isModalOpen, isPwdModalOpen } = this.state
    const user = this.user || {}
    const branch = this.branch || {}
    const columns = [
      {
        title: '成员姓名',
        width: 120,
        dataIndex: 'userName',
        fixed: 'left',
        render: userName => <Button type="link">{userName}</Button>
      },
      {
        title: '账号状态',
        width: 80,
        dataIndex: 'status',
        render: status => status === 0 ? <Tag color="#70B603">正 常</Tag> : <Tag color="#FF5B6F">禁 用</Tag>
      },
      {
        title: '角色',
        dataIndex: 'ruleName',
        width: 100,
      },
      {
        title: '部门',
        dataIndex: 'departmentName',
        width: 150
      },
      {
        title: '手机号',
        width: 120,
        dataIndex: 'loginPhone'
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        width: 150
      },
      {
        title: '用户名',
        dataIndex: 'loginName',
        width: 130
      },
      {
        title: '最近登录',
        dataIndex: 'lastLoginTime',
        width: 130
      },
      {
        title: '操作',
        fixed: 'right',
        width: 90,
        render: row => (
          <>
            <Tooltip title="重置密码" color='black'>
              <KeyOutlined onClick={() => this.updatePwd(row)} style={{ cursor: 'pointer' }} />
            </Tooltip>
            <Tooltip title="编辑" color='black'>
              <EditOutlined onClick={() => this.editUser(row)} style={{ padding: '0 20px', cursor: 'pointer' }} />
            </Tooltip>
            <Tooltip title={ row.status ===0 ? '禁用' : '启用' } color='black'>
              <UnlockOutlined onClick={() => this.enableUser(row)} style={{ cursor: 'pointer' }} />
            </Tooltip>
          </>
        )
      }
    ]
    return (
      <div className='account'>
        <div className='top'>
          <div style={{ fontSize: 18, fontWeight: 'bold' }}>部门与成员</div>
          <div>
            <Button type="primary" onClick={this.showDrawer}>添加新成员</Button>
          </div>
        </div>
        
        <Row style={{ marginTop: 20 }}>
          {/* 左侧部门列表 */}
          <Col span={7}>
            <Card className='vh'>
              {
                treeData?.length > 0 ? (
                  <Tree
                    autoExpandParent
                    // treeData={treeData}
                    treeData={this.treeData(treeData)}
                    defaultSelectedKeys={[treeData[0].id]}
                    defaultExpandAll={true}
                    onSelect={this.onSelect}
                    // fieldNames={{
                    //   title: 'name', key: 'id', children: 'ywDepartmentInfoList'
                    // }}
                  />
                ) : null
              }
            </Card>
          </Col>

          {/* 右侧部门成员列表 */}
          <Col span={17}>
            <Card className='vh'>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h3>{tree?.name ? tree.name : '西子运维'}</h3>
                <div>
                  <Button type="link" onClick={this.addDepart}>添加部门</Button>
                  <Button type="link" onClick={this.editDepart} disabled={tree === null || tree.length || tree?.name === '西子运维' ? true : false}>编辑部门</Button>
                  <Button danger type="text" onClick={this.remove} disabled={tree === null || tree.length || tree.lowerNum > 0 || tree?.name === '西子运维' ? true : false}>删除</Button>
                </div>
              </div>
              <Table rowKey='id' columns={columns} dataSource={list} scroll={{x: 1500}} />
            </Card>
          </Col>
        </Row>

        {/* 部门 */}
        <Modal title={branch.id ? '编辑部门' : '添加部门'}
          open={isModalOpen}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            ref={this.formRef}
            layout='vertical'
            initialValues={{
              name: branch.name,
              parentId: branch.parentId
            }}
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
              <TreeSelect
                dropdownStyle={{
                  maxHeight: 500,
                  overflow: 'auto',
                }}
                placeholder="请选择所属上级部门"
                allowClear
                treeDefaultExpandAll
                treeData={treeData}
                fieldNames={{
                  label: 'name', value: 'id', children: 'ywDepartmentInfoList'
                }}
              />
            </Item>
          </Form>
        </Modal>
        {/* 添加成员 */}
        <Drawer
          title={user.id ? '编辑成员' : '添加成员'}
          width='60%'
          closable={false}
          open={open}
          bodyStyle={{ paddingBottom: 80 }}
          destroyOnClose={true}
          extra={
            <Space>
              <Button onClick={this.cancle}>取消</Button>
              <Button onClick={this.addUser} type="primary">确定{user.id ? '修改' : '添加'}</Button>
            </Space>
          }
        >
          <h2>账号信息</h2>
          <div className='info' style={{ border: '1px solid #91D5FF', color: '#1890FF', backgroundColor: '#E6F7FF', padding: 5, fontSize: 12 }}>登录手机号码以及电子邮箱也将用于相关信息的接收，创建账号的默认密码为 123456，创建成功后请联系成员及时修改面貌</div>
          <Form
            ref={this.formRef}
            layout="vertical"
            style={{ marginTop: 20 }}
            initialValues={{
              userName: user.userName,
              loginPhone: user.loginPhone,
              loginName: user.loginName,
              email: user.email,
              departmentId: user.departmentId,
              ruleId: user.ruleId
            }}
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
                  name="departmentId"
                  label="所在部门"
                  rules={[
                    { required: true, message: '所在部门必选' }
                  ]}
                >
                  <TreeSelect
                    dropdownStyle={{
                      maxHeight: 500,
                      overflow: 'auto',
                    }}
                    placeholder="请选择所在部门"
                    allowClear
                    treeDefaultExpandAll
                    // onChange={onChange}
                    treeData={treeData}
                    fieldNames={{
                      label: 'name', value: 'id', children: 'ywDepartmentInfoList'
                    }}
                  />
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

        {/* 重置密码 */}
        <Modal title="重置密码" open={isPwdModalOpen} onOk={this.handlePwdOk} onCancel={this.handlePwdCancel}>
          <Form
            ref={this.pwdRef}
            layout="vertical"
          >
            <Form.Item
              name="password"
              label="新密码"
              rules={[
                { required: true, message: '密码为必填项' }
              ]}
            >
              <Input type='password' placeholder="请输入设置的新密码（限6-20字符，数字、英文，不区分大小写）" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
