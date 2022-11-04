import React, { Component } from 'react'
import { Card, Drawer, Form, Input, Space, Button, Cascader, Select, Col, Row, DatePicker, message } from 'antd'
import MapContainer from '../../../../components/map/MapContainer.js'
import { getCityList, addStation } from '../../../../api/monitoring'

const { Item } = Form
const { Option } = Select
export default class FormData extends Component {
 state = {
    open: false,
    options: [],
    provinceId: undefined, // 省
    cityId: undefined, // 市
    areaId: undefined, // 区
    setTime: '', // 建站时间
    gridConnectionTime: '', // 并网时间
  }
  componentDidMount() {
    this.getCityList()
  }
  
  getCityList = () => {
    getCityList().then(res => {
      const options = this.getCity(res.data)
      this.setState({
        options
      })
    })
  }
  areaChange = (value) => {
    this.setState({
      provinceId: value[0], // 省
      cityId: value[1], // 市
      areaId: value[2], // 区
    })
  }
  siteChange = (date, dateString) => {
    this.setState({
      setTime: dateString
    })
  }
  gridChange = (date, dateString) => {
    this.setState({
      gridConnectionTime: dateString
    })
  }
  // 取消创建电站
  onClose = () => {
    this.props.closeDrawer(false)
  }
  add = () => {
    const { provinceId, cityId, areaId, setTime, gridConnectionTime } = this.state
    const form = this.refs.form.getFieldsValue()
    let formInfo = {...form, provinceId, cityId, areaId, setTime, gridConnectionTime}
    addStation(formInfo).then(res => {
      if(res.code === 0) {
        message.success(res.msg)
        this.onClose()
      }
    })
  }
  getCity = (data) => {
    let arr = []
    let obj = {}
    data.forEach(item => {
      if (item.ywCityInfoList) {
        item.ywCityInfoList = this.getCity(item.ywCityInfoList)
      }	
      obj = {
        value: item.id,
        label: item.cityName,
        children: item.ywCityInfoList
      }					
	    arr.push(obj)
    })
	  return arr
  }

  render() {
    const { options } = this.state
    const { open } = this.props
    return (
      <Drawer
          title="创建电站"
          placement='right'
          width='80%'
          headerStyle={{ backgroundColor: '#FFF' }}
          drawerStyle={{ backgroundColor: '#F2F2F2' }}
          closable={false}
          keyboard={false}
          maskClosable={false}
          open={open}
          extra={
            <Space>
              <Button onClick={this.onClose}>取消</Button>
              <Button type="primary" onClick={this.add}>创建</Button>
            </Space>
          }
        >
      <Form
        name="basic"
        ref='form'
        layout="vertical"
        initialValues={{
          platformType: 0
        }}
        // onFinish={this.onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Card style={{ marginBottom: 5 }}>
          <h3>基础信息</h3>
          <Item label="电站名称" name="stationName">
            <Input />
          </Item>
          <Item label="电站位置">
            <Row gutter={20}>
              <Col span={6}>
                <Input />
              </Col>
              <Col span={2}>
                <Button type="primary">搜索</Button>
              </Col>
            </Row>
            <MapContainer />
          </Item>
          <Item label="区域" name='area'>
            <Cascader options={options} onChange={this.areaChange} style={{ width: '25%' }} />
          </Item>
          <Item label="详细地址" name="locationAddress">
            <Input />
          </Item>
          <Row gutter={20}>
            <Col span={12}>
              <Item label="经度" name='locationLng'>
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item label="纬度" name='locationLat'>
                <Input />
              </Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Item label="建站时间">
                <DatePicker
                  onChange={this.siteChange}
                  format='YYYY-MM-DD'
                />
              </Item>
            </Col>
            <Col span={12}>
              <Item label="并网日期">
                <DatePicker
                onChange={this.gridChange}
                format='YYYY-MM-DD'
                />
              </Item>
            </Col>
          </Row>
        </Card>
        <Card>
          <h3>系统信息</h3>
          <Row gutter={20}>
            <Col span={6}>
              <Item label="电站类型" name='stationType'>
                <Select
                // onChange={handleChange}
                >
                  <Option value={0}>分布式商业</Option>
                  <Option value={1}>分布式工业</Option>
                  <Option value={2}>分布式户用</Option>
                  <Option value={3}>地面电站</Option>
                </Select>
              </Item>
            </Col>
            <Col span={6} offset={6}>
              <Item label="系统类型" name='systemType'>
                <Select
                // onChange={handleChange}
                >
                  <Option value={0}>光伏+电网</Option>
                  <Option value={1}>光伏+电网+用电</Option>
                  <Option value={2}>光伏+电网+用电+储能</Option>
                </Select>
              </Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Item label="方位角（°）" name='azimuth'>
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item label="倾角（°）" name='dip'>
                <Input />
              </Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Item label="装机容量" name="installedCapacity">
                <Input />
              </Item>
            </Col>
            <Col span={6}>
              <Item label="接入渠道" name="platformType">
                <Select
                // showSearch
                // placeholder="Select a person"
                // optionFilterProp="children"
                // onChange={onChange}
                // onSearch={onSearch}
                // filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                >
                  <Option value={0}>小麦</Option>
                  <Option value={1}>乐福</Option>
                </Select>
              </Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Item label="接入ID或地址" name="platformStationId">
                <Input />
              </Item>
            </Col>
          </Row>
        </Card>
        <Card style={{ margin: '5px 0' }}>
          <h3>收益信息</h3>
          <Row gutter={20}>
            <Col span={12}>
              <Item label="度电收益（元/kWh）" name="profitKwh">
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item label="补贴收益（元/kWh）" name="profitSubsidy">
                <Input />
              </Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Item label="总成本（元）" name="cost">
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item label="日还款（元)" name="payBack">
                <Input />
              </Item>
            </Col>
          </Row>
        </Card>
        <Card>
          <h3>业主信息</h3>
          <Row gutter={20}>
            <Col span={12}>
              <Item label="业主姓名" name="ownerName">
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item label="业主联系电话" name="contactPhone">
                <Input />
              </Item>
            </Col>
          </Row>
        </Card>
      </Form>
      </Drawer>
    )
  }
}
