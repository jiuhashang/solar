import React, { Component } from 'react'
import AMapLoader from '@amap/amap-jsapi-loader'
import './MapContainer.css'

class  MapComponent extends Component {
  constructor() {
      super()     
      this.map = {}
  }
  // 2.dom渲染成功后进行map对象的创建
  componentDidMount() {
    AMapLoader.load({
      key: "a262e007b273b03941d3e551974dbbc8", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.ToolBar', 'AMap.Geolocation'] // 需要使用的的插件列表
    }).then((AMap) => {
      this.map = new AMap.Map("container", { //设置地图容器id
        zoomEnable: true,
        scrollWheel: false,
        viewMode: "3D", //是否为3D地图模式
        zoom: 3.5, //初始化地图级别
        center: [111.002725,38.076636], //初始化地图中心点位置
      })
      // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
      this.map.addControl(new AMap.ToolBar())
      // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
      // this.map.addControl(new AMap.Scale())
      // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
      // this.map.addControl(new AMap.HawkEye({isOpen:true}))
      // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
      // this.map.addControl(new AMap.MapType())
      // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
      this.map.addControl(new AMap.Geolocation({
          position: 'RB',
          offset: [20, 90]
        })
      )
    }).catch(e => {
      // console.log(e)
    })
  }
  render() {
    // 1.初始化创建地图容器,div标签作为地图容器，同时为该div指定id属性；
    return (
      <div id="container" className="map" style={{ minHeight: '260px' }}></div>
    )
  }
}
//导出地图组建类
export default MapComponent