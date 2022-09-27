import React, { Component } from 'react'
import { Button, Card } from 'antd'
import './index.less'
// 电站对比
export default class Contrast extends Component {
  render() {
    return (
      <div className='contrast'>
        <div className='top'>
          <div style={{ fontSize: 18 }}>电站对比</div>
          <Button type="primary">添加对比</Button>
        </div>
        <Card style={{ marginTop: 20, height: '83vh' }}>
        </Card>
      </div>
    )
  }
}
