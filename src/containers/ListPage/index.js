import React,{Component} from 'react'
import {Divider,Button,message,Table, Input, Icon,} from 'antd'
import Highlighter from 'react-highlight-words'
import PropTypes from 'prop-types'
import {getListAction,deleteItemAction} from '../../redux/reducers/listPage'
import AddItem from './AddItem'
import {connect} from 'react-redux'

class ListPageContainer extends Component{
  static propTypes={
    list: PropTypes.array,
    getListFromRedux:PropTypes.func,
    deleteItemRedux:PropTypes.func,
    addItemRedux:PropTypes.func
  }
  
  constructor(props){
    super(props)
    this.props.getListFromRedux()
    this.state={
      selectedRowKeys: [],      // 选中的key
      searchText:'',     // 搜索词
      filteredInfo:null,     // 过滤器
      showAdd:false // 添加对话框
    }
    // filterDropdown 自定义的列筛选功能
    this.getColumnSearch=dataIndex=>(
      {
        filterDropdown:({ setSelectedKeys, selectedKeys, confirm, clearFilters })=>(
          <div>
            <Input
              ref={node=>this.searchInput=node}
              placeholder='搜索'
              value={selectedKeys[0]}
              onChange={e=>setSelectedKeys(e.target.value?[e.target.value]:[])}
              onPressEnter={this.handleSearch.bind(this,selectedKeys, confirm)}
            ></Input>
            <Button
              type='primary'
              icon='search'
              size='small'
              onClick={this.handleSearch.bind(this,selectedKeys, confirm)}
            >搜索</Button>
            <Button
              size='small'
              onClick={this.handleResetSearch.bind(this,clearFilters)}
            >重置</Button>
          </div>
        ),
        filterIcon:filtered=>(
          <Icon 
            type='search'
            style={{color:filtered?'#1890ff':undefined}}
          ></Icon>
        ),
        onFilter:(value,record)=>record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange:visible=>{
          if (visible) {
            setTimeout(()=>this.searchInput.select())
          }
        },
        render:text=>(
          <Highlighter
            highlightStyle={{backgroundColor:'#ffc069'}}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          ></Highlighter>
        )
      }
    )
  }

  // 搜索
  handleSearch(selectedKeys, confirm) {
    confirm()
    this.setState({
      searchText:selectedKeys[0]
    })
  }

  // 清空搜索
  handleResetSearch(clearFilters) {
    clearFilters()
    this.setState({
      searchText: ''
    })
  }

  // 点击复制
  clickCopy(text){
    let oInput=document.createElement('input')
    oInput.value=text
    document.getElementById('listPage').appendChild(oInput)
    oInput.select()
    document.execCommand('Copy')
    oInput.style.display='none'
    message.success('复制成功');
  }

  edit(){}

  // 删除行
  delete(text, record, index) {    
    this.props.deleteItemRedux([record.key])
  }

  // 清空选择
  resetSelect(){
    this.setState({
      selectedRowKeys:[]
    })
  }

  // 分页、过滤、排序变化时
  handleChange(pagination, filters, sorter) {
    console.log(pagination, filters, sorter);
    
    if (filters.sex){
      this.setState({
        filteredInfo: filters
      })
    }    
  }

  // 清空过滤
  clearFilters(){
    this.setState({
      filteredInfo: null
    })
  }

  // 删除多个
  deleteMore(){
    this.props.deleteItemRedux(this.state.selectedRowKeys)
  }

  // 添加
  addItem(){
    this.setState({
      showAdd:true
    })
  }

  // 关闭添加
  cancelModel() {
    this.setState({
      showAdd: false
    })
  }

  render(){
    // 列
    let filteredInfo=this.state.filteredInfo||{}
    const columns= [
      {
        title: '姓名',
        key: 'name',
        dataIndex: 'name',
        ...this.getColumnSearch('name')
      },
      {
        title: '性别',
        key: 'sex',
        dataIndex: 'sex',
        // 筛选器
        filters:[
          {
            text:'男',
            value: '男'
          },
          {
            text:'女',
            value: '女'
          }
        ],
        onFilter:(value,record)=>record.sex.includes(value),  // 筛选判断
        filteredValue:filteredInfo.sex||null
      },
      {
        title: '年龄',
        key: 'age',
        dataIndex: 'age',
        // 排序
        sorter:(a,b)=>a.age-b.age
      },
      {
        title: '拷贝',
        key: 'copy',
        dataIndex: 'copy',
        render:(text)=>(
          <span onClick={this.clickCopy.bind(this,text)}>
            {text}
          </span>
        )
      },
      {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        render:(text,record,index)=>(
          <span>
            <Button type='link' size='small' onClick={this.edit.bind(this,text,record,index)}>编辑</Button>
            <Divider type='vertical'></Divider>
            <Button type='link' size='small' onClick={this.delete.bind(this,text,record,index)}>删除</Button>
          </span>
        )
      },  
    ]      

    // 多选
    const rowSelection = {
      selectedRowKeys:this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === '不可选中'
      }),
      hideDefaultSelections: true,
      selections:[
        {
          text:'选择奇数',
          onSelect: changableRowKeys=>{
            let newArr = changableRowKeys.filter((item,index)=>{
              return index%2===0
            })
            this.setState({
              selectedRowKeys: newArr
            })
          }
        },
        {
          text:'选择偶数',
          onSelect: changableRowKeys=>{
            let newArr = changableRowKeys.filter((item,index)=>{
              return index%2===1
            })
            this.setState({
              selectedRowKeys: newArr
            })
          }
        }
      ]
    }

    return (
      <div id="listPage">
        <span>已选择：{this.state.selectedRowKeys.length}项</span>
        <Button 
          type='primary'
          disabled={!this.state.selectedRowKeys.length}
          onClick={this.resetSelect.bind(this)}
        >清空选择</Button>
        <Button 
          type='primary'
          onClick={this.clearFilters.bind(this)}          
          disabled={!this.state.filteredInfo}
        >清空过滤</Button>
        <Button 
          type='primary'
          onClick={this.deleteMore.bind(this)}          
          disabled={!this.state.selectedRowKeys.length}
        >删除多个</Button>
        <Button 
          type='primary'
          onClick={this.addItem.bind(this)}          
        >添加</Button>
        <Table
          columns={columns}
          dataSource={this.props.list}
          rowSelection={rowSelection}
          onChange={this.handleChange.bind(this)}
          pagination = {
            {
              defaultPageSize: 10,
              showQuickJumper: true,
              showSizeChanger: true,
              total: this.props.list.length,
              showTotal:total=>`共${total}项`
            }
          }
        ></Table>
        <AddItem
          visible={this.state.showAdd}
          cancelModel={this.cancelModel.bind(this)}
        ></AddItem>
      </div>      
    )
  }
}

const mapStateToProps=state=>{
  return {
    list: state.listPage.list
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    getListFromRedux:()=>{
      dispatch(getListAction())
    },
    deleteItemRedux:keys=>{
      dispatch(deleteItemAction(keys))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ListPageContainer)