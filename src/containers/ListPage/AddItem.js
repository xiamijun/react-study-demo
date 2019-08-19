import React,{Component} from 'react'
import { Modal,Form,Input,Radio,message,Button,InputNumber } from 'antd';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addItemAction} from '../../redux/reducers/listPage'

class AddItem extends Component{
  static propTypes={
    visible:PropTypes.bool,     // 可见
    cancelModel: PropTypes.func,  // 关闭弹窗
    addItemRedux:PropTypes.func,    // 添加到redux
  }

  // 关闭
  cancelModel() {
    this.props.form.resetFields();
    if (this.props.cancelModel) {
      this.props.cancelModel()
    }
  }

  // 提交，验证
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let nameArr=this.props.list.map(item=>item.name)
        if (nameArr.includes(values.name)) {
          message.error('姓名已存在')
        }else{
          this.props.addItemRedux({
            ...values,
            key: values.name,
            copy: '点击复制'
          })
          this.cancelModel()
        }        
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={this.props.visible}
        title="添加"
        onCancel={this.cancelModel.bind(this)}
        onOk={this.handleSubmit.bind(this)}
      >
        <Form labelCol={{span:4}} wrapperCol={{span:14}}>
          <Form.Item label="姓名">
            {
              getFieldDecorator('name',{
                rules:[{required:true,message:'请输入姓名'}]
              })(
                <Input></Input>
              )
            }
          </Form.Item>
          <Form.Item label="性别">
            {
              getFieldDecorator('sex',{
                rules:[{required:true,message:'请选择性别'}]
              })(
                <Radio.Group>
                  <Radio value='男'>男</Radio>
                  <Radio value='女'>女</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label='年龄'>
            {
              getFieldDecorator('age',{
                rules:[{required:true,message:'请输入年龄'}]
              })(
                <InputNumber min={1}></InputNumber>
              )
            }
          </Form.Item>
          <Form.Item label="拷贝">
            点击复制
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

AddItem = Form.create()(AddItem)

const mapStateToProps=state=>{
  return {
    list: state.listPage.list
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    addItemRedux: item => {
      dispatch(addItemAction(item))
    },
  }  
}

export default connect(mapStateToProps,mapDispatchToProps)(AddItem)