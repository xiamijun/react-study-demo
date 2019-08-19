import React,{Component} from 'react'
import Head from '../../components/Head'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getUsername} from '../../redux/reducers/user'

class HeadContainer extends Component{
  static propTypes={
    username:PropTypes.string
  }

  loginOut(){
    console.log('login-out');    
    this.props.history.push('/')
  }

  render(){
    return (
      <Head
        username={this.props.username}
        onLoginOut={this.loginOut.bind(this)}
      ></Head>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: getUsername(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeadContainer))