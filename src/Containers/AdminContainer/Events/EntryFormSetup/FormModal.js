import React from 'react';
import { Modal,Form  } from 'antd';
import { connect } from 'react-redux';

import {Text,Email} from './Schema';
import {handleCancel,handleOk,addMainForm} from '../../../../Store/EntryForm/EntryFormAction';

 class FormModal extends React.Component {
    state = {  }
    handleSubmit = () =>{
        // this.props.dispatch(handleOk())
    }

    showModal = () => {
       
      }
      handleOk = (e) => {
      
      }

      handleCancel = (e) => {
      
      }
      handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }else{
              this.props.dispatch(addMainForm(fieldsValue));
              console.log(fieldsValue);
          }
        });
    }

    renderForm = (field,getFieldDecorator,formItemLayout) =>{
        switch (field) {
            case "text": return <Text getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} />;
            case "email": return <Email getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} />;
            default:break;
        }
    }

    render() {
    const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
     

        return (
            <Modal
              title="Add Form"
              visible={this.props.visible}
              onCancel={()=>this.props.dispatch(handleCancel())}
              onOk={(e)=>this.handleSubmit(e)}
            >

            <Form >
             {this.renderForm(this.props.fieldName,getFieldDecorator,formItemLayout)}
            </Form>

            </Modal>
         
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        visible: state.form.showModal,
        fieldName: state.form.addField
    }
}

const WrappedFormModal = Form.create({ name: 'Form_create_modal' })(FormModal);
export default connect(mapStateToProps)(WrappedFormModal);