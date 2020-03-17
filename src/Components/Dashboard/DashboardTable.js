import React, {useEffect} from 'react';
import { 
    makeStyles, 
    Paper 
} from '@material-ui/core';
import MaterialTable from 'material-table';
import history from '../../Store/history';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

const DateFormat = (props) => {
	const date = new Date(props.date);
	const fullDate = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
	const time = date.getHours() +":"+ date.getMinutes()+":"+date.getSeconds();
	return <span>{fullDate}
  {/* <br/>{time} */}
  </span>;
};

function createData(name, startDate, enddate) {
  return { name, startDate, enddate };
}


export default function DashboardTable(props) {
  const classes = useStyles();

  useEffect(()=>{
  // console.log("CHECK ",props);
  },[])
  
  const handleRowClicked = id => {
    // history.push('/Home/Events/Details/'+id)
}

  return (
    <Paper className={classes.root}>
      <MaterialTable
        title="Recent Events"
        columns={[
          { 
            title: 'Name', 
            field: 'name' ,
          },
          { 
            title: 'Start date', 
            field: 'start_date',
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
        ]}
        data={props.eventListing}   
        options={{
          search: false
        }}
        onRowClick = { (event,rowData)=>{handleRowClicked(rowData.id);}}
      />
    </Paper>
  );
}

// const mapStateToProps =state=>{
//   console.log("sate",state)
//   return{
//     eventList: state.events.eventList
//   }
// }

// export default withRouter(connect(mapStateToProps,{eventList})(DashboardTable));