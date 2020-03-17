import React from 'react';
import {connect} from 'react-redux';
import history from '../../Store/history';

class EventUrl extends React.Component {
    state = {  }

    componentDidMount(){
        console.log(this.props.match.params);
        console.log(this.props.token);
        if(!this.props.token){
            history.push('/')
        }else{
            // console.log('/Home/Event/'+this.props.match.params);
            history.push('/Home/Event/'+this.props.match.params.eventseo);
        }
        
    }
    render() {
        return (
            <h1>{this.props.match.params.eventseo}</h1>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        token: state.login.token
    }
}

export default connect(mapStateToProps)(EventUrl);