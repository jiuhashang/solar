import React, { Component } from 'react'
import { Button, Form, Input, message } from 'antd'
import {
  UserOutlined,
  LockOutlined
} from '@ant-design/icons'
import { login } from '../../api'
import './index.less'

const Item = Form.Item

export default class Login extends Component {
  formRef = React.createRef()

  login = () => {
    this.formRef.current.validateFields().then(values => {
      login(values).then(res => {
        if (res.code === 0) {
          message.success('登录成功')
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('loginName', res.data.loginName)
          this.props.history.replace('/home')
        } else {
          message.error(res.msg)
        }
      })
    }).catch(err => { })
  }
  render() {
    return (
      <div className='login'>
        <h2>西子智慧运维管理平台</h2>
        <Form
          name="basic"
          ref={this.formRef}
        >
          <Item
            name="loginPhone"
            rules={[
              { required: true, message: '请输入账号' }
            ]}
          >
            <Input prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)'}} />} />
          </Item>

          <Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' }
            ]}
          >
            <Input type='password' prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)'}} />} />
          </Item>

          <div style={{textAlign: 'center', marginBottom: 10}}>
            <span className='con'>若遗失账号或密码，请联系后台管理员处理</span>
          </div>
          
          <Item>
            <Button type="primary" onClick={this.login} style={{ width: '100%' }}>登 录</Button>
          </Item>
        </Form>
      </div>
    )
  }
}