import React, { Component } from 'react'
import * as echarts from 'echarts'
import * as dayjs from 'dayjs'
import { Card, Radio, DatePicker } from 'antd'

import { getDeviceView } from '../../../../../api/monitoring'

const { MonthPicker } = DatePicker
export default class Chart extends Component {
  constructor(props) {
    super(props)
    this.state.deviceId = props.deviceId
  }
  state = {
    type: 0,
    date: dayjs().format('YYYY-MM-DD'),
    deviceId: undefined, 
    chartData: [], // 图表数据
  }
  
  componentDidMount() {
    this.getChart()
    this.timer = setInterval(() => {
      this.getChart()
    }, 5*60*1000)
    this.initChart() 
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  initChart = () => {
    this.myChart = echarts.init(document.getElementById('c1'))
    var option = {
      color: ['#566E91'],
      tooltip: {
        trigger: 'axis',
        // axisPointer: {
        //   type: 'cross',
        //   label: {
        //     backgroundColor: '#6a7985'
        //   }
        // }
      },
      grid: {
        // top: '5%',
        left: '2%',
        right: '2%',
        bottom: '2%',
        containLabel: true
      },
      legend: {
        orient: 'horizontal',
        x: 'center',
        y: 'top'
      },
      xAxis: {
        boundaryGap: false,
        // splitNumber: 12,
        axisLine: {
          show: true
        },
        axisTick: {
          show: true
        }
      },
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              // color: 'rgba(255, 255, 255, 0.8)',
              width: 1,
              type: 'solid'
            }
          }
        }
      ],
      series: [
        {
          name: '累计发电量（有功）',
          type: 'line',
          // stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 1,
            color: 'rgb(119, 153, 193)'
          },
          showSymbol: false,
          label: {
            show: false,
            position: 'top'
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(1, 132, 213, 0.4)'
              },
              {
                offset: 1,
                color: 'rgba(1, 132, 213, 0.01)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          }
        }
      ]
    }
    option && this.myChart.setOption(option)
  }
  updateChart = (type) => {
    var option = {
      xAxis: {
        type
      },
      series: [
        {
          data: this.state.chartData
        }
      ]
    }
    this.myChart.setOption(option)
  }
  getChart = () => {
    const { type, date, deviceId } = this.state
    getDeviceView({type, date, deviceId}).then(res => {
      // console.log(res)
      const chartData = res.data.map(item => [item.time, item.power])
      this.setState({chartData}, () => {
        if(type === 0) {
          this.updateChart('time')
        } else {
          this.updateChart('category')
        }
      })
    })
  }
  btnChange = (e) => {
    // console.log(e)
    this.setState({
      type: e.target.value
    })
  }
  onChange = (date, dateString) => {
    // console.log(dateString)
    this.setState({
      date: dateString
    },() => {
      this.getChart()
    })
  }
  render() {
    const { type } = this.state
    return (
      <Card>
        <div style={{ fontSize: 16, marginBottom: 20 }}>历史数据</div>
        <div style={{ textAlign: 'right' }}>
          <Radio.Group value={type} onChange={this.btnChange} size='small' style={{ marginRight: 10, marginBottom: 20 }}>
            <Radio.Button value={0}>日</Radio.Button>
            <Radio.Button value={1}>月</Radio.Button>
            <Radio.Button value={2}>年</Radio.Button>
            <Radio.Button value={3}>总</Radio.Button>
          </Radio.Group>
          {
            type === 0 ?
            <DatePicker onChange={this.onChange} size='small' /> : type === 1 ? 
            <MonthPicker onChange={this.onChange} picker="month" size='small' /> : type === 2 ? 
            <DatePicker onChange={this.onChange} picker="year" size='small' /> : null
          }
        </div>
        <div id="c1" style={{width: '100%', height: 380 }}></div>
      </Card>
    )
  }
}
