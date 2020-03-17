import React,{useEffect} from 'react';
import { makeStyles,Paper} from '@material-ui/core';
import MaterialTable from 'material-table';
import {connect, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { _entryList } from '../../../Store/Entry/EntryAction';


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
  }));
   
function UserList(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(_entryList());
    },[]);
  
    return (
    <div>
        {/* <Title>Entry List</Title> */}
      <Paper className={classes.root}>
        <MaterialTable
        title="User List"
        columns={[
              { 
                title: 'Name', 
                field: 'name',
                render: name => name.first_name +" "+ name.last_name,
              },
              // { 
              //   title: 'Mobile No.', 
              //   field: 'mobile' 
              // },
              { 
                title: 'Email Id', 
                field: 'email' 
              },
              { 
                title: 'Company Name', 
                field: 'company_name' 
              },
              { 
                title: 'Country', 
                field: 'country' 
              },
        ]}  
        data={props.entryListData}     
      />
      </Paper>
    </div>
    );
  }

const mapStateToProps =state=>{
  return{
   entryListData: state.entry.entryList
  }
}

export default withRouter(connect(mapStateToProps,{_entryList})(UserList));