import React from 'react';
import { Form,Input,Switch  } from 'antd';

const Text =(props)=><div>
     <Form.Item label="Label" {...props.formItemLayout} >
        {props.getFieldDecorator('labelName', {
            rules: [{
                required: true, message: 'Please input your Label Name!',
            }],
        })(
            <Input type="text" />
        )}
    </Form.Item>

    <Form.Item {...props.formItemLayout} label="required" >
        {props.getFieldDecorator('required', {valuePropName: 'checked'})(
        <Switch />
        )}
    </Form.Item>

    <Form.Item {...props.formItemLayout} >
        {props.getFieldDecorator('inputType', {
            initialValue:"text"
        })(
            <Input type="hidden"/>
        )}
    </Form.Item>

    <Form.Item label="Error" {...props.formItemLayout} >
        {props.getFieldDecorator('Error', {
            rules: [{
                required: true, message: 'Please input your Error Shown if field is empty!',
            }],
        })(
            <Input type="text" />
        )}
    </Form.Item>
    </div>;


const Email =(props)=><div>
     <Form.Item label="Label" {...props.formItemLayout} >
        {props.getFieldDecorator('labelName', {
            rules: [{
                required: true, message: 'Please input your Label Name!',
            }],
        })(
            <Input type="text" />
        )}
    </Form.Item>

    <Form.Item {...props.formItemLayout} >
        {props.getFieldDecorator('inputType', {
            initialValue:"email"
        })(
            <Input type="hidden"/>
        )}
    </Form.Item>
    
    <Form.Item {...props.formItemLayout} label="required" >
        {props.getFieldDecorator('required', {valuePropName: 'checked'})(
        <Switch />
        )}
    </Form.Item>

    <Form.Item label="Error" {...props.formItemLayout} >
        {props.getFieldDecorator('Error', {
            rules: [{
                required: true, message: 'Please input your Error Shown if field is empty!',
            }],
        })(
            <Input type="text" />
        )}
    </Form.Item>
    </div>;

export {Text,Email};