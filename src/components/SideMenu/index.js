import React,{Component} from 'react'
import { Menu, Icon } from 'antd';
import {menuItems} from '../../utils/constant'
import PropTypes from 'prop-types'
const { SubMenu } = Menu;

class SideMenu extends Component{
  static propTypes={
    onClickItem:PropTypes.func,
    openKeys:PropTypes.array,  // 展开的一级，“学校管理”
    selectedKeys: PropTypes.array // 选中的末级，'/dashboard/schoolCount/schoolManage'
  }

  constructor(props){
    super(props)
    this.state={
      openKeys:this.props.openKeys,
      selectedKeys: this.props.openItem
    }
  }

  // 改变一级菜单
  openChange(openKeys){
    if (openKeys.length) {
      this.setState({
        openKeys: [openKeys[openKeys.length - 1]]
      })
    }else{
      this.setState({
        openKeys: []
      })
    }    
  }

  // 点击二级菜单
  clickItem({ item, key, keyPath, domEvent }){    
    if (this.props.onClickItem) {
      this.props.onClickItem(key)
    }
    this.setState({
      selectedKeys: [key]
    })
  }

  render(){
    return (
      <Menu
        mode="inline"
        style={{width:256}}
        openKeys={this.state.openKeys}
        onOpenChange={this.openChange.bind(this)}
        selectedKeys={this.state.selectedKeys}
      >
        {
          menuItems.map((item,index)=>(              
              <SubMenu
                key={item.level1}
                title={
                  <span>
                    <Icon type={item.icon}></Icon>
                    <span>{item.level1}</span>
                  </span>
                }
              >
                {
                  item.level2.map((item2,index2)=>(
                    <Menu.Item
                      key={item2.url}
                      onClick={this.clickItem.bind(this)}
                    >{item2.name}</Menu.Item>
                  ))
                }
              </SubMenu>
            ))
        }
      </Menu>
    )
  }
}

export default SideMenu