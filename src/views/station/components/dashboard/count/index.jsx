// 实时电量数据
import React, { Component } from 'react'
import { Card  } from 'antd'
import './index.less'

import Electricity from './electricity'

export default class Count extends Component {
  state = {
    activeTabKey: 0
  }
 
  render() {
    const tabListNoTitle = [
      {
        key: 0,
        tab: '实时发电',
      },
      {
        key: 1,
        tab: '实时用电',
      },
      {
        key: 2,
        tab: '实时电网',
      }
    ]
    const { activeTabKey } = this.state
    const { electricity } = this.props
    return (
      <Card
        style={{ width: '100%', height: 339 }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        onTabChange={(key) => {
          this.setState({
            activeTabKey: key
          })
        }}
      >
        { activeTabKey === 0 ? <Electricity {...electricity} /> : null }
      </Card>
    )
  }
}

