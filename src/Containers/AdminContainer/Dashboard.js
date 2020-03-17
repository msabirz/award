// import React from 'react';
//
// import { Table, Statistic, Row, Col, Button } from 'antd';
// import DefaultLayout from '../Defaultlayout';
// import { connect } from 'react-redux';
// import { Chart, Tooltip, Axis, Legend, Pie, Coord } from 'viser-react';
// const DataSet = require('@antv/data-set');
//
//
// const sourceData = [
//   { item: 'Test', count: 40 },
//   { item: 'Test2', count: 21 },
//   { item: 'Test3', count: 17 },
//   { item: 'Test4', count: 13 },
//   { item: 'Test5', count: 9 }
// ];
//
// const scale = [{
//   dataKey: 'percent',
//   min: 0,
//   formatter: '.0%',
// }];
//
// const dv = new DataSet.View().source(sourceData);
// dv.transform({
//   type: 'percent',
//   field: 'count',
//   dimension: 'item',
//   as: 'percent'
// });
// const data = dv.rows;
//
//
//
// class Dashboard extends React.Component {
//
//   render() {
//     const columns = [{
//       title: 'Name',
//       dataIndex: 'name',
//       rowKey: 'name',
//     }, {
//       title: 'Start Date',
//       dataIndex: 'start_date',
//       rowKey: 'start_date',
//     }, {
//       title: 'End Date',
//       dataIndex: 'end_date',
//       rowKey: 'end_date',
//     }];
//
//     return (
//       <DefaultLayout>
//         <div style={{ padding: 24, minHeight: 280 }}>
//           {/* <h1>Latest Events</h1> */}
//
//         <Row>
//           <Col span={12}>
//             <h3 style={{textAlign:"center"}}>Entrants List</h3>
//           <Chart forceFit height={400} data={data} scale={scale}>
//           <Tooltip showTitle={false} />
//           <Axis />
//           <Legend dataKey="item" />
//           <Coord type="theta" />
//           <Pie
//             position="percent"
//             color="item"
//             style={{ stroke: '#fff', lineWidth: 1 }}
//             label={['percent', {
//               offset: -40,
//               textStyle: {
//                 rotate: 0,
//                 textAlign: 'center',
//                 shadowBlur: 2,
//                 shadowColor: 'rgba(0, 0, 0, .45)'
//               }
//             }]}
//           />
//         </Chart>
//         </Col>
//
//
//         <Col span={12}>
//           <h3 style={{textAlign:"center"}}>Event Registration</h3>
//           <Chart forceFit height={400} data={data} scale={scale}>
//           <Tooltip showTitle={false} />
//           <Axis />
//           <Legend dataKey="item" />
//           <Coord type="theta" />
//           <Pie
//             position="percent"
//             color="item"
//             style={{ stroke: '#fff', lineWidth: 1 }}
//             label={['percent', {
//               offset: -40,
//               textStyle: {
//                 rotate: 0,
//                 textAlign: 'center',
//                 shadowBlur: 2,
//                 shadowColor: 'rgba(0, 0, 0, .45)'
//               }
//             }]}
//           />
//         </Chart>
//         </Col>
//         </Row>
//
//           <Table
//             columns={columns}
//             dataSource={this.props.latestEvents}
//             rowKey={this.props.latestEvents.id} />
//         </div>
//       </DefaultLayout>
//     );
//   }
// }
// const mapStateToProps = state => {
//   return {
//     latestEvents: state.login.latest_events
//   }
// }
// export default connect(mapStateToProps)(Dashboard);


import React,{useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, Grid, Paper } from '@material-ui/core';
import {Chart} from '../../Components/Dashboard/Chart';
import DashboardTable from '../../Components/Dashboard/DashboardTable';
import {_latestEventList} from '../../Store/Events/EventsAction';
import {connect, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    // overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 500,
  },
    progress: {
      margin: theme.spacing(2),
      textAlign:'center',
      margin:'0 auto',
      position: 'absolute',
      top: '50%',
      left: '0',
      right:'0',
    },
}));

function Dashboard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(_latestEventList());
  },[])

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
  <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={6} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                  <Chart />
              </Paper>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                  <Chart />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              {props.isListLoading ? <CircularProgress className={classes.progress} size={100} />:
                <DashboardTable eventListing={props.eventListing}/>
              }
            </Grid>
          </Grid>
  );
}

const mapStateToProps =state=>{
  return{
    eventListing: state.events.latestEventList,
    isListLoading:state.events.isListLoading
  }
}

export default withRouter(connect(mapStateToProps,{_latestEventList})(Dashboard));