import React,{Component} from 'react'
import { Form, Icon, Input, Button } from 'antd';
import PropTypes from 'prop-types'

class Login extends Component{
  static propTypes={
    onSubmit:PropTypes.func
  }

  submit(){
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.props.onSubmit) {
          this.props.onSubmit(values)
        }
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Form.Item>
          {
            getFieldDecorator('username')(
              <Input 
                placeholder="请输入用户名"
                prefix={<Icon type="user"></Icon>}
              ></Input>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('password')(
              <Input 
                placeholder="请输入密码"
                prefix={<Icon type="lock"></Icon>}
                type="password"
              ></Input>
            )
          }          
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={this.submit.bind(this)}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

Login=Form.create()(Login)

export default Login