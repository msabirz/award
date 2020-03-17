import React from 'react';
import {Button} from 'antd';
import {connect} from 'react-redux';

// import {addFormField} from '../../../../Store/EntryForm/EntryFormAction';

class FormItems extends React.Component {
    state = {  }
    render() {
        return (
            <React.Fragment>
                <Button onClick={()=>this.props.dispatch(('email'))} >Add Email</Button>
                <Button onClick={()=>this.props.dispatch(('text'))} >Add other field</Button>
            </React.Fragment>
        );
    }
}

export default connect()(FormItems);