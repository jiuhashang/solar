import React, { Component } from 'react'
import { Radio, DatePicker } from 'antd'
import dayjs from 'dayjs'
import * as echarts from 'echarts'
import './index.less'
import { getAllStationCount } from '../../../../api'

const { MonthPicker } = DatePicker
export default class History extends Component {
  state = {
    date: dayjs().format('YYYY-MM'),
    type: 0,
    time: [],
    power: []
  }

  componentDidMount() {
    this.getList()
    setTimeout(() => {
      this.initChart()
    }, 0)
  }

  getList = () => {
    const { date, type } = this.state
    getAllStationCount({date, type}).then(res => {
      // console.log(res)
      const time = res.data.map(item => item.time)
      const power = res.data.map(item => item.power)
      this.setState({
        time,
        power
      }, () => {
        this.updateChart(0)
      })
    })
  }
   
  btnChange = (e) => {
    this.setState({
      type: e.target.value
    })
  }
  onChange = (date, dateString) => {
    this.setState({ date: dateString }, () => {
      this.getList()
    })
  }

  initChart = () => {
    this.myChart = echarts.init(document.getElementById('c1'))
    var option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '1%',
        top: '10%',
        right: '1%',
        bottom: '1%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          showBackground: false,
          barWidth: '40%',
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.1)'
          }
        }
      ]
    }
    option && this.myChart.setOption(option)
    // window.addEventListener('resize', () => {
    //   this.myChart.resize()
    // })
    this.myChart.on('finished', () => {  
      this.myChart.resize()
    })
  }

  updateChart = () => {
    var option = {
      xAxis: {
        data: this.state.time
      },
      series: [
        {
          data: this.state.power
        }
      ]
    }
    this.myChart.setOption(option)
  }

  render() {
    const { type } = this.state
    return (
      <div className='history'>
        <div className='top'>
          <div style={{fontSize: 14, color: '#000'}}>整体数据历史</div>
          <div>
            <Radio.Group value={type} onChange={this.btnChange} size='small'>
              <Radio.Button value={0}>月</Radio.Button>
              <Radio.Button value={1}>年</Radio.Button>
            </Radio.Group>
            {
              type === 0 ? <MonthPicker onChange={this.onChange} picker="month" size='small' style={{ marginLeft: 10 }} /> : <DatePicker onChange={this.onChange} picker="year" size='small' style={{ marginLeft: 10 }} />
            }
          </div>
        </div>
        <div id="c1" style={{ width: '100%', height: 260 }}></div>
      </div>
    )
  }
}
