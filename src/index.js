import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import moment from 'moment'
import zhCN from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn'
import App from './App'
moment.locale('en')
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </BrowserRouter>
)

