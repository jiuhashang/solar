import React, { Component } from 'react'
import { Button, Card } from 'antd'
import './index.less'

export default class Record extends Component {
  render() {
    return (
      <div className='record'>
        <div className='top'>
          <div style={{ fontSize: 18 }}>维保记录</div>
          <Button type="primary">添加新维保记录</Button>
        </div>
        <Card style={{ marginTop: 20, height: '83vh' }}>
        </Card>
      </div>
    )
  }
}
