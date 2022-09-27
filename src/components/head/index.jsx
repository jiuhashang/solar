import React, { Component } from 'react'
import logo from '../../assets/images/123.png'
import './index.less'

export default class Head extends Component {
  render() {
    return (
      <div className='header'>
        <h2 style={{ color: '#fff' }}>西子运维管理平台</h2>
        <img src={ logo } alt="logo" />
      </div>
    )
  }
}
