import React from 'react';
import clsx from 'clsx';
import { 
    makeStyles,
    CssBaseline,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    Divider,
    IconButton,
    List,
    MenuItem ,
    Menu 
 } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import DefaultLayout from './Defaultlayout';
import history from '../Store/history';
import {connect, useDispatch} from 'react-redux';
import { withRouter,Route,Switch } from 'react-router-dom';
import logo from '../images/logo.png';

// //main route
import {routes,userRoutes} from '../Navigation/routes';
import MainFooter from '../Components/Footer';
import SidebarNav from '../Components/SideBarNav';
import { _logout } from '../Store/Login/loginAction';
const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    background:'#fff'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: '#262f3d',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  button: {
    margin: theme.spacing(1),
    // background: '#115293',
    // color: '#fff',
  },
  logo: {
    padding: 5,
    height: 64,
    margin:"0 auto"
  },
}));

function HomeContainer(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(true);
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openProfile = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = ()=> {
        dispatch(_logout());
    }

    const profile = ()=> {
      history.push('/Home/Profile/');
  }

   
      // function handleChange(event) {
      //   setAuth(event.target.checked);
      // }
    
      function handleMenu(event) {
        setAnchorEl(event.currentTarget);
      }
    
      function handleClose() {
        setAnchorEl(null);
      }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          {/* <Button variant="contained" className={classes.button} color="secondary" onClick={logout}>Logout</Button> */}
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openProfile}
                onClose={handleClose}
              >
                <MenuItem onClick={profile}>Profile</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
        <img src={logo} alt={logo} className={classes.logo}/>
          <IconButton onClick={handleDrawerClose} style={{color:'secondary'}}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
       
        <Divider />
        <List><SidebarNav/></List>
      
      </Drawer>
      <DefaultLayout>
     
          <Switch>
            {console.log("props of roleid",props.roleId)}
              {
                props.roleId === 1 ?
                  routes.map((route,idx)=>{
                  return route.component ?(
                    <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => <route.component {...props} /> }/>
                  ):null;
                }):

                userRoutes.map((route,idx)=>{
                  return route.component ?(
                    <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => <route.component {...props} /> }/>
                  ):null; })

              }
          </Switch>

          <MainFooter />
            
      </DefaultLayout>
      
    </div>
  );
}

const mapStateToProps =state=>{
  return{
    roleId:state.login.roleId
  }
}
export default withRouter(connect(mapStateToProps,{_logout})(HomeContainer));