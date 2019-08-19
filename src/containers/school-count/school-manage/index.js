import React,{Component} from 'react'
import MyBread from '../../../components/MyBread'
import Search from '../../../components/Search'

class SchoolManage extends Component{
  constructor(props){
    super(props)
    this.state={
      searchFields:[
        {
          key:'schoolName',
          label:'学校名称',
          type:'input'
        },
        {
          key:'schoolSystem',
          label:'学制',
          type:'select',
          options:[
            {
              label:'全部',
              value:'all'
            },
            {
              label:'小学',
              value:'xiaoxue'
            },
            {
              label:'中学',
              value:'zhongxue'
            },
            {
              label:'大学',
              value:'daxue'
            },
          ]
        },
        {
          key:'time',
          label:'时间',
          type:'datePicker'
        },
      ]
    }
  }
  
  render(){
    return (
      <div>
        <MyBread
          list={['学校统计','学校管理']}
        ></MyBread>
        <Search
          searchFields={this.state.searchFields}
        ></Search>
      </div>
    )
  }
}

export default SchoolManage