import React, { Component } from 'react'
import { Card, Table, Drawer } from 'antd'
import {
  CaretDownOutlined,
  SyncOutlined
} from '@ant-design/icons'
import './index.less'
// 报警列表
export default class Alarm extends Component {
  componentDidMount() {
    this.tabSwitch()
  }
  state = {
    current: 0,
    open: false
  }
  tabSwitch = (current = 0) => {
    this.setState({ current })
  }
  showDrawer = () => {
    const { open } = this.state
    this.setState({ open: !open })
  }
  render() {
    const { current, open } = this.state

    const columns = [
      {
        title: '等级',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '开始时间',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: '恢复时间',
        dataIndex: 'address',
        key: '1'
      },
      {
        title: '持续时间(min)',
        dataIndex: 'address',
        key: '2'
      },
      {
        title: '警告说明',
        dataIndex: 'address',
        key: '3'
      },
      {
        title: '状态',
        dataIndex: 'address',
        key: '4'
      }
    ]
    const data = []
    return (
      <div className='alarm'>
        <div style={{ fontSize: 18 }}>报警列表</div>
        <Card style={{ marginTop: 20 }} size='small'>
          <div style={{ padding: '0 15px', fontSize: 12, display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <span onClick={() => this.tabSwitch(0)} className={current === 0 ? 'cur' : 'nocur'}>全部</span>
              <span onClick={() => this.tabSwitch(1)} className={current === 1 ? 'cur' : 'nocur'} style={{ margin: '0 20px' }}>发生中</span>
              <span onClick={() => this.tabSwitch(2)} className={current === 2 ? 'cur' : 'nocur'}>已恢复</span>
            </div>
            <div>
              <span style={{ fontSize: 12, cursor: 'pointer' }} onClick={this.showDrawer}>展开筛选</span>
              <CaretDownOutlined style={{ margin: '0 20px 0 10px' }} />
              <SyncOutlined style={{ fontSize: 16, cursor: 'pointer' }} />
            </div>
          </div>
        </Card>
        <Card id='drawer' className='site-drawer-render-in-current-wrapper'>
          { current === 0 ? <Table columns={columns} dataSource={data} /> : current === 1 ? '发生中' : '已恢复' }
          <Drawer
            headerStyle={{ display: 'none' }}
            placement="top"
            closable={false}
            open={open}
            getContainer={document.getElementById('drawer')}
            style={{ position: 'absolute' }}
          >
          </Drawer>
        </Card>
      </div>
    )
  }
}
