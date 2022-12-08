import React, { Component } from 'react'
import { Tree } from 'antd'

export default class Stree extends Component {
  
  onSelect = (selectedKeys, info) => {
    this.props.changeTreeData(info.node)
  }

  treeData = (data) => {
    const list = []
    data.forEach(item => {
      const treeNode = {
        ...item,
        title: item.name,
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
    const { treeData } = this.props
    return (
      treeData?.length > 0 ? 
        (
          <Tree
            autoExpandParent
            // treeData={this.treeData(treeData)}
            treeData={treeData}
            defaultSelectedKeys={[treeData[0].id]}
            defaultExpandAll={true}
            onSelect={this.onSelect}
            fieldNames={{
              title: 'name', key: 'id', children: 'ywDepartmentInfoList'
            }}
          />
        ) : null
    )
  }
}
