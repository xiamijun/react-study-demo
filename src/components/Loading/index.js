import React from 'react'
import { Spin } from 'antd'
import './style.css'

export default function(){
  return (
    <div className="page-loader loader-full">
      <Spin size="large" delay={500}></Spin>
    </div>    
  )
}