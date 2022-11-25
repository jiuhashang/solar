import React, { Component } from 'react'
import MapComponent from '../../../../components/map/MapContainer'
import './index.less'
export default class Map extends Component {
  render() {
    return (
      <div className='map'>
        <div className='top' style={{fontSize: 14, color: '#000' }}>电站分布</div>
        <MapComponent className='amap' />
      </div>
    )
  }
}
