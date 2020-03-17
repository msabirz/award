// import React from 'react';
// import { Table,Row,message  } from 'antd';
// import {NavLink} from 'react-router-dom';

// import DefaultLayout from '../Defaultlayout';

// import {connect} from 'react-redux';
// //redux action
// import {eventList,unmountDeleteEvent} from '../../Store/Events/EventsAction';

// class Events extends React.Component {
    
// componentDidMount(){
//   this.props.dispatch(eventList());
// }
// componentDidUpdate(){
//   if(this.props.message != null){
//     message.success('Event Deleted Successfully', 3);
//   }
// }
// componentWillUnmount(){
//   this.props.dispatch(unmountDeleteEvent());
// }

//     render() {
//       const columns = [{
//         title: 'Event Name',
//         dataIndex: 'name',
//         key: 'name',
//         render: (name,record) => <NavLink to={"/Home/Events/Details/"+record.id}>{name}</NavLink>,
//       }, {
//         title: 'Start Date',
//         dataIndex: 'start_date',
//         key: 'start_date',
//       }, {
//         title: 'End Date',
//         dataIndex: 'end_date',
//         key: 'end_date',
//       }, 
//       {
//         title: 'Submission Date',
//         dataIndex: 'submission_deadline',
//         key: 'submission_deadline',
//       }];

//         return (
//             <DefaultLayout>
//                 <div style={{ background: '#ECECEC', padding: 24, minHeight: 280 }}>
//                  <Row>
//                    <div style={{width:'50%',float:"left"}}>
//                     <h1>Events</h1>
//                    </div>
//                  </Row>
//                     <Table 
//                       columns={columns} 
//                       dataSource={this.props.eventList}   
//                     />
//                 </div>
//             </DefaultLayout>
//         );
//     }
// }

// const mapStateToProps =state=>{
//   return {
//     eventList: state.events.eventList,
//     message: state.events.deleteEventMsg
//   }
// }
// export default connect(mapStateToProps)(Events);