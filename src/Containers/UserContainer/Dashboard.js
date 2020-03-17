import React,{useEffect} from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button
} from '@material-ui/core';
import {connect, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { _modalList } from '../../Store/Login/loginAction';


const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
  },
}));



function UserDashboard() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(_modalList);
    },[]);

  const classes = useStyles();
  const [form, setValues] = React.useState({
    event_name:'',
  });


  //  function handleClickOpen() {
  //   setOpen(true);
  // }

  // function handleClose() {
  //   setOpen(false);
  // }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const dialogClose = () => {
    alert("hello everyone");
    setOpen(false);
  }

  return (
    <div>
      {/* <Dialog
        open={handleClickOpen}
        onClose={ dialogClose }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Event List</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <form autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">Event Name</InputLabel>
        <Select
          onClose={dialogClose}
          onOpen={false}
          value={form.event_name}
          name="event_name"
          id="event_name"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogClose} color="primary">
            Cancle
          </Button>
        </DialogActions>
      </Dialog> */}
       {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
}

const mapStateToProps =state=>{
  console.log("state=>",state)
return{
 entryListData: state.entry.modalList
}
}

export default withRouter(connect(mapStateToProps,{_modalList})(UserDashboard));