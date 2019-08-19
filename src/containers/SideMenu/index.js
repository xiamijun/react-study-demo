import React,{Component} from 'react'
import SideMenu from '../../components/SideMenu'
import {withRouter} from 'react-router-dom'

class SideMenuContainer extends Component{

  constructor(props){
    super(props)
    // 匹配一级
    let arr = this.props.location.pathname.split('/')
    let type = arr[2]
    let openName = ''
    switch (type) {
      case 'schoolCount':
        openName = '学校统计'
        break;
      case 'activity':
        openName = '活跃度'
        break;
      default:
        break;
    }
    this.state={
      openKeys: [openName], // 一级菜单
      openItem: [this.props.location.pathname] // 二级菜单
    }
  }

  clickItem(url){
    this.props.history.push(url)
  }

  render(){
    return (
      <SideMenu
        openKeys={this.state.openKeys}
        openItem={this.state.openItem}
        onClickItem={this.clickItem.bind(this)}
      ></SideMenu>
    )
  }
}

export default withRouter(SideMenuContainer)