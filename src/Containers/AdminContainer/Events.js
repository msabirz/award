import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import {connect, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';
import history from '../../Store/history';
import {makeStyles, Button} from '@material-ui/core';
import { _eventList, _deleteEvent } from '../../Store/Events/EventsAction';

const DateFormat = (props) => {
	const date = new Date(props.date);
	const fullDate = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
	// const time = date.getHours() +":"+ date.getMinutes()+":"+date.getSeconds();
	return <span>{fullDate}
  {/* <br/>{time} */}
  </span>;
};

function Events(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_eventList());
  },[]);

const handleRowClicked = (id,seo) => {
   console.log("idonclick",id,"seoonclick",seo);
   localStorage.setItem('event_code', seo);
    history.push({
      pathname:'/Home/Event/EntryForm',
      state: { seo_keyword: seo , id: id}
    })
}

const handleViewClicked = (seo) => {
    // history.push({pathname:'/Home/Events/Details/'+ id})
    history.push({
      pathname: '/Home/Events/Details/',
      state: { seo_keyword: seo }
    })
}

const handleRowDelete = id => {
  dispatch(_deleteEvent(id));
}

const handleSelectEvent = (id,seo) =>{
  localStorage.setItem('event_code', seo);
  history.push({pathname:'/Home'})
}



  return (
   
    <div>
       {console.log("props",props.eventListing)}
    <MaterialTable
        title="Events"
        columns={[
          { 
            title: 'Event Name', 
            field: 'name' 
          },
          { 
            title: 'Start Date', 
            field:'start_date',
            render: (rowData) => (
              <p>
                <DateFormat date={rowData.start_date} />
              </p>
            )
          },
          { 
            title: 'End Date', 
            field: 'end_date',
            render: (rowData) => (
              <p>
                <DateFormat date={rowData.end_date} />
              </p>
            )
          },
          { 
            title: 'Submission Deadline', 
            field: 'submission_deadline',
            render: (rowData) => (
              <p>
                <DateFormat date={rowData.submission_deadline} />
              </p>
            )
          },
        ]}

        data={props.eventListing}

        actions={[
          {
            icon: 'visibility',
            tooltip: 'View Event',
            onClick:  (e,rowData) =>   history.push({pathname: '/Home/Events/Details/',state: { seo_keyword: rowData.seo_keyword }})
          },
          {
            icon: 'edit',
            tooltip: 'Edit Event',
            onClick:  (e,rowData) => history.push({pathname:'/Home/Events/EventEdit',state:{ seo_keyword: rowData.seo_keyword,id: rowData.id }})
          },
          {
            icon: 'delete',
            tooltip: 'Delete Event',
            onClick: (e,rowData) => {handleRowDelete(rowData.id);},
          },
          {
            icon: ()=><Button variant="contained" color="secondary" >Select Event</Button>,
            tooltip: 'Select Event',
            onClick: (e,rowData) => {handleSelectEvent(rowData.id,rowData.seo_keyword);},
            // onClick:  (event, rowData) => history.push({pathname:'/Home'+rowData.id,state:{ eventCode: rowData.seo_keyword }})
          },
          {
            icon: ()=><Button variant="contained" color="secondary" > Add Event </Button> ,
            tooltip: 'Add Event',
            isFreeAction: true,
            onClick: () => history.push('/Home/Events/AddEvent/')
          },
        ]}
        onRowClick = { (e,rowData)=>{handleRowClicked(rowData.id,rowData.seo_keyword);}}
        options={{
          actionsColumnIndex: -1
        }}
      />
      </div>
  );
}

const mapStateToProps = (state) =>{
  return{
    eventListing: state.events.eventList,
  }
}

export default withRouter(connect(mapStateToProps,{_eventList, _deleteEvent})(Events));