import { Button, Form, Input } from 'antd'
import {
  MobileOutlined,
  LockOutlined
} from '@ant-design/icons'
import React from 'react'
import './index.less'

const Item = Form.Item

const Login = (props) => {
  const onFinish = (values) => {
    props.history.push('/')
  }
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo)
  }
  return (
    <div className='login'>
      <h2>西子智慧运维管理平台</h2>
      <Form
        name="basic"
        initialValues={{
          username: 123,
          password: 123,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Item
          name="username"
          rules={[
            {
              required: true
            },
          ]}
        >
          <Input prefix={<MobileOutlined />} />
        </Item>

        <Item
          name="password"
          rules={[
            {
              required: true
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Item>

        <Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>登 录</Button>
        </Item>
      </Form>
    </div>
  )
}
export default Login