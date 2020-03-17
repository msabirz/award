// import React from 'react';
// import {Menu,Icon} from 'antd';
// import PropTypes from 'prop-types';
// import {Link} from 'react-router-dom';
// import style from './style/sidebarnav.module.css';
// import history from '../Store/history';
//
// const menu=[
//   {Key:"/Home",NavLink:'/Home',IconType:'user',Name:'Dashboard'},
//   {Key:"/Home/Events",NavLink:'/Home/Events',IconType:'notification',Name:'Events'},
//   {Key:"/Home/EventsOverview",NavLink:'/Home/EventsOverview',IconType:'notification',Name:'Event Overview'},
//   {Key:"/Home/EventEdit",NavLink:'/Home/EventEdit',IconType:'notification',Name:'Event Edit'},
//   {Key:"/Home/FormSetup",NavLink:'/Home/FormSetup',IconType:'form',Name:'Form Setup'},
//   {Key:"/Home/EntrantList",NavLink:'/Home/EntrantList',IconType:'usergroup-add',Name:'Entrant List'},
//   {Key:"/Home/EntryList",NavLink:'/Home/EntryList',IconType:'unordered-list',Name:'Entry List'},
//   {Key:"/Home/OrderList",NavLink:'/Home/OrderList',IconType:'snippets',Name:'Order List'},
//   {Key:"/Home/ManageList",NavLink:'/Home/ManageList',IconType:'database',Name:'Manage Files'},
//   // {Key:"/Home/Events",NavLink:'/Home/Events',IconType:'notification',Name:'Events'}
// ]
// const menu2=[
//   {Key:"/Home",NavLink:'/Home',IconType:'user',Name:'Dashboard'},
//   {Key:"/Home/Events",NavLink:'/Home/Events',IconType:'notification',Name:'Events'}
// ]
//
// const SidebarNav = (props)=>{
// return(
//     <React.Fragment >
//     <div className="logo" style={{paddingLeft:20,background:'white'}}>
//     <img src={require('../images/logo.png')} alt="logo"/>
//     </div>
//
//         <Menu defaultSelectedKeys={[history.location.pathname]} className={style.sideNav}>
//           {props.roleId === 1 ?
//           menu.map((data)=>{
//             return(
//               <Menu.Item key={data.Key}>
//                 <Link to={data.NavLink} className={style.navLink}>
//                   <Icon type={data.IconType} />
//                   <span className="nav-text">{data.Name}</span>
//                 </Link>
//               </Menu.Item>
//             )
//           }):
//           menu2.map((data)=>{
//             return(
//               <Menu.Item key={data.Key}>
//                 <Link to={data.NavLink} className={style.navLink}>
//                   <Icon type={data.IconType} />
//                   <span className="nav-text">{data.Name}</span>
//                 </Link>
//               </Menu.Item>
//             )
//           })
//           }
//
//         </Menu>
//     </React.Fragment>
// );
//
// }
// SidebarNav.defaultProps = {
//   roleId: 2
// };
//
// SidebarNav.propTypes = {
//   roleId: PropTypes.number
// };
//
//
// export default SidebarNav;

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import history from '../Store/history';
import {Link} from 'react-router-dom';
import { 
  makeStyles,
  ListItem,
  List,
  Icon,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  sideNav: {
    // background: '#dddddd',
    marginTop:50,
},
navLink: {
    color:'black',
    textDecoration: 'none',
},
text: {
  padding: 5,
  // textTransform: 'uppercase',
  color: '#fff',
},
icon: {
  color: '#fff',
},
tabs: {
  borderRight: `1px solid ${theme.palette.divider}`,
},
}));

const menu=[
      {Key:"/Home",NavLink:'/Home',IconType:'account_circle',Name:'Dashboard'},
      {Key:"/Home/Events",NavLink:'/Home/Events',IconType:'volume_mute',Name:'Events'},
      // {Key:"/Home/EventsOverview",NavLink:'/Home/EventsOverview',IconType:'notification',Name:'Event Overview'},
      // {Key:"/Home/EventEdit",NavLink:'/Home/EventEdit',IconType:'notification',Name:'Event Edit'},
      // {Key:"/Home/FormSetup",NavLink:'/Home/FormSetup',IconType:'form',Name:'Form Setup'},
      // {Key:"/Home/EntrantList",NavLink:'/Home/EntrantList',IconType:'usergroup-add',Name:'Entrant List'},
      {Key:"/Home/EntryList",NavLink:'/Home/EntryList',IconType:'list',Name:'Entry List'},
      {Key:"/Home/UserList",NavLink:'/Home/UserList',IconType:'list',Name:'User List'},
      {Key:"/Home/Entry/EntryForm",NavLink:'/Home/Entry/EntryForm',IconType:'list',Name:'Entry Form'},
      {Key:"/Home/Category/CategoryList/",NavLink:'/Home/Category/CategoryList/',IconType:'list',Name:'Category'},
      {Key:"/Home/Entrant/EntrantList/",NavLink:'/Home/Entrant/EntrantList/',IconType:'list',Name:'Entrant List'},
      // {Key:"/Home/OrderList",NavLink:'/Home/OrderList',IconType:'snippets',Name:'Order List'},
      // {Key:"/Home/ManageList",NavLink:'/Home/ManageList',IconType:'database',Name:'Manage Files'},
      // {Key:"/Home/Events",NavLink:'/Home/Events',IconType:'notification',Name:'Events'}
    ]

    const menu2=[
      {Key:"/Home",NavLink:'/Home',IconType:'user',Name:'Dashboard'},
      {Key:"/Home/Events",NavLink:'/Home/Events',IconType:'notification',Name:'Events'}
    ]

 function SidebarNav(props){
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  // useEffect(()=>{
  //   console.log(history)
  // })

  const adminRoute=menu.map((data,key)=>{
    // console.log(history.location.pathname == data.NavLink);
    return(
      <Link to={data.NavLink } className={classes.navLink} key={key}>
      {/* <div style={history.location.pathname == data.NavLink? 
        {background:'blue'}:
        {background:'red'}}> */}
      <ListItem button selected={history.location.pathname == data.NavLink}>
      <ListItemIcon>
        <Icon className={classes.icon}>
            {data.IconType}
        </Icon>
      </ListItemIcon>
          <ListItemText primary={data.Name} className={classes.text}/>
      </ListItem>
      {/* </div> */}
      </Link>
    )
  })

  const userRoute=menu2.map((data,key)=>{
    return(
      <Link to={data.NavLink} className={classes.navLink} key={key}>
      {/* <div style={history.location.pathname ==data.NavLink? {background:'blue'}:{background:'transparent'}}> */}
      <ListItem button selected={history.location.pathname == data.NavLink}>
      <ListItemIcon>
        <Icon className={classes.icon}>
            {data.IconType}
        </Icon>
      </ListItemIcon>
          <ListItemText primary={data.Name} className={classes.text}/>
      </ListItem>
      {/* </div> */}
      </Link>
    )
  })




  return (
  <div>
    <List   className={classes.sideNav}> 
    {
        props.roleId == 1 ? adminRoute:userRoute
    }
    
    
    </List>
</div>
  );
}

SidebarNav.defaultProps = {
  roleId: 2
};

const mapStateToProps =state=> {
  // console.log(state)
  return{ 
    roleId: state.login.roleId
  }
}

export default connect(mapStateToProps,null)(SidebarNav)

  
  


