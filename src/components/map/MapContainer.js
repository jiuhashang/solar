import React, { Component } from 'react'
import AMapLoader from '@amap/amap-jsapi-loader'
import './MapContainer.less'

class MapContainer extends Component {
  // constructor(props) {
  //   super(props)     
  // }
  // 2.dom渲染成功后进行map对象的创建
  componentDidMount() {
    AMapLoader.load({
      key: "a262e007b273b03941d3e551974dbbc8",
      version: "2.0",
      plugins: ['AMap.ToolBar', 'AMap.Geolocation', 'AMap.PlaceSearch', 'AMap.AutoComplete']
    }).then((AMap) => {
      this.map = new AMap.Map("container", { //设置地图容器id
        resizeEnable: true,
        zoomEnable: true,
        scrollWheel: false,
        viewMode: "3D", //是否为3D地图模式
        zoom: 3.7, //初始化地图级别
        center: [111.002725,38.076636], //初始化地图中心点位置
      })
      this.map.addControl(new AMap.ToolBar())
      this.map.addControl(new AMap.Geolocation({
          position: 'RB',
          offset: [20, 90]
        })
      )
      this.auto = new AMap.AutoComplete({
        city: '全国',
        input: "tipinput"
      })
      this.placeSearch = new AMap.PlaceSearch({
        map: this.map
      })
      this.auto.on("select", e => {
        console.log(e)
        this.placeSearch.setCity(e.poi.adcode)
        this.placeSearch.search(e.poi.name)  //关键字查询查询
      })
    }).catch(e => {
      // console.log(e)
    })
  }
  render () {
    const { height } = this.props
    return (
      <div className='wrap'>
        <div id="container" className="map" style={{height}}></div>
        { height === 380 ? <input id='tipinput' className='input' /> : ''}
      </div> 
    )
  }
}

export default MapContainer