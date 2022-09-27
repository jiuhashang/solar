import React, { Component } from 'react'
import { Card } from 'antd'
import './index.less'
// 报表分析
export default class Report extends Component {
  state = {
    activeTabKey2: 'article'
  }
  onTab2Change = (key) => {
    console.log(key)
  }

  render() {
    const tabListNoTitle = [
      {
        key: 'article',
        tab: '生成报表'
      }
    ]
    const contentListNoTitle = {
      article: <p>article content</p>
    }

     const { activeTabKey2 } = this.state
    return (
      <div className='report'>
        <div style={{ fontSize: 18 }}>报表分析</div>
        <Card
          style={{ height: '84vh', marginTop: 20 }}
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey2}
          onTabChange={key => this.onTab2Change(key)}
        >
          {contentListNoTitle[activeTabKey2]}
        </Card>
      </div>
    )
  }
}
