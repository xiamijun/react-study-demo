import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducers from './redux/reducers'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

let store=createStore(reducers)

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>, 
  document.getElementById('root')
);
