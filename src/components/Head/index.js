import React,{Component} from 'react'
import './index.css'
import PropTypes from 'prop-types'

class Head extends Component{
  static propTypes={
    onLoginOut:PropTypes.func,
    username:PropTypes.string
  }

  loginOut(){
    if (this.props.onLoginOut) {
      this.props.onLoginOut()
    }
  }

  render(){
    return (
      <div className='head-bar'>
        <span className='username'>{this.props.username}</span>
        <span className='login-out' onClick={this.loginOut.bind(this)}>退出登录</span>
      </div>
    )
  }
}

export default Head