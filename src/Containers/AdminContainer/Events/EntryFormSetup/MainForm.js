import React from 'react';
import {Form,Input,Button,Divider,Radio,DatePicker } from 'antd'
import { connect } from 'react-redux';


class MainForm extends React.Component {
    state = {  }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }else{
            // Should format date value before submit.
          const values = {
            ...fieldsValue,
            'entryDeadline': fieldsValue['entryDeadline'].format('YYYY-MM-DD HH:mm:ss'),
          };
            //this.props.dispatch(addMainForm(fieldsValue));
              console.log(values);
          }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: {
            xs: { span: 16 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        };
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 2,
            },
          },
        };

        const config = {
          rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };

        return (
            <div>
                <h1>Entry Form Setup</h1>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Divider orientation="left">General</Divider>

              <Form.Item label="Open for entry" {...formItemLayout}>
                  <Radio.Group onChange={this.handleFormLayoutChange}>
                      <Radio value="open">Open</Radio>
                      <Radio value="closed">Closed</Radio>
                    </Radio.Group>
                  
              </Form.Item>

              <Form.Item label="Entry Deadline" {...formItemLayout}>
                {getFieldDecorator('entryDeadline', config)(
                      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    )}
              </Form.Item>
            
            <Divider orientation="left">Form Preview</Divider>
            {this.props.formObj.map((data,key)=>
                   
              <Form.Item label={data.labelName} {...formItemLayout} key={key}>
                  {getFieldDecorator(data.labelName)(
                      <Input type={data.inputType} disabled/>
                  )}
              </Form.Item>    
            )}
                
            <Form.Item
                  wrapperCol={{
                      xs: { span: 24, offset: 0 },
                      sm: { span: 16, offset: 8 },
                  }}
              >
                  <Button type="primary" htmlType="submit">Submit</Button>
              </Form.Item>
        </Form>            
        </div>
     
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        formObj:state.form.formObject
    }
}

const WrappedMainForm = Form.create({ name: 'horizontal_login' })(MainForm);
export default  connect(mapStateToProps)(WrappedMainForm);