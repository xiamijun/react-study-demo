import React,{Component} from 'react'
import Login from '../../components/Login'
import './style.css'
import {withRouter} from 'react-router-dom'
import {login} from '../../redux/reducers/user'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { message } from 'antd';

class LoginContainer extends Component{
  static propTypes={
    onLogin:PropTypes.func
  }

  submit(obj){
    if (!obj.username) {
      message.error('用户名不能为空');
      return;
    }
    if (this.props.onLogin) {
      this.props.onLogin(obj.username)      
    }
    this.props.history.push('/dashboard')
  }

  render(){
    return (
      <div className="login">
        <Login
          onSubmit={this.submit.bind(this)}
        ></Login>
      </div>
    )
  }
}

const mapStateToProps=state=>{
  return {
    username:state.username
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    onLogin:username=>{
      dispatch(login(username))
    }
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoginContainer))