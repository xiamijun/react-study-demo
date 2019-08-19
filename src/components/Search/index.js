import React,{Component} from 'react'
import { Form, Row, Col, Input, Button,Select,DatePicker   } from 'antd';
import PropTypes from 'prop-types'
import './style.css'
const { Option } = Select;

class Search extends Component{
  static propsTypes={
    searchFields:PropTypes.array  // 传入的表单域
  }

  searchHandler(){
    this.props.form.validateFields((err,values)=>{
      for (const key in values) {
        if (values[key]&&values[key]._isAMomentObject) {
          values[key] = values[key].format('YYYY-MM-DD')
        }        
      }
      console.log(values);
      
    })
  }

  // 根据表单域渲染单个表单
  getItem(item){
    switch (item.type) {
      case 'input':
        return <Input></Input>    
      case 'select':
        return (
          <Select style={{width:200}}>
            {
              item.options.map((item2,index2)=>(
                <Option value={item2.value} key={item2.value}>{item2.label}</Option>
              ))
            }
          </Select>
        )
      case 'datePicker':
        return <DatePicker></DatePicker>
      default:
        break;
    }
  }

  render(){
    const {getFieldDecorator} =this.props.form
    return (
      <Form layout="inline">
        <Row>
          {
            this.props.searchFields.map((item, index) => (
              <Col span={6} key={item.key}>    
                <Form.Item label={item.label}>
                  {
                    getFieldDecorator(item.key)(this.getItem(item))
                  }              
                </Form.Item>                         
              </Col>
            ))
          }
        </Row>
        <Button type="primary" onClick={this.searchHandler.bind(this)} className='search-btn'>搜索</Button>
      </Form>
    )
  }
}

Search = Form.create()(Search)
export default Search