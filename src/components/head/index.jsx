import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Dropdown, Menu, Space, Avatar } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import './index.less'

 class Head extends Component {
  logout = () => {
    localStorage.removeItem('token')
    this.props.history.replace('/login')
  }
  render() {
    const menu = (
      <Menu
        items={[
          {
            key: '1',
            label: (
              <div onClick={this.logout} style={{width: 80, textAlign: 'center'}}>
                退 出
              </div>
            ),
          }
        ]}
      />
    )
    return (
      <div className='header'>
        <div style={{color: '#fff', fontSize: 18}}>西子运维管理平台</div>
        <div>
          <Avatar size={30} icon={<UserOutlined />} style={{marginRight: 15}} />
          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <span style={{color: '#fff', fontSize: 16}}>
                  {sessionStorage.getItem('loginName')}
                </span>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    )
  }
}

export default withRouter(Head)