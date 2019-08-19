import React,{Component} from 'react'
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types'

class MyBread extends Component{
  static propTypes={
    list:PropTypes.array
  }

  render(){
    return (
      <Breadcrumb>
      {
        this.props.list.map((item,index)=>(
        <Breadcrumb.Item key={index}>
          <span>{item}</span>
        </Breadcrumb.Item> 
        ))
      }
      </Breadcrumb>
    )
  }
}

export default MyBread