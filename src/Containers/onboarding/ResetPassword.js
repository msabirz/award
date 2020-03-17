import React,{useState,useEffect} from 'react';
import {
  Container,
  makeStyles,
  TextField,
  CssBaseline,
  Button,
  Link

} from '@material-ui/core';
import logo from '../../images/logo.png';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ResetPassword() {

    const classes = useStyles();

  useEffect(()=>{
    // console.log("hiiiiii")
  })
  // const dispatch = useDispatch();

  const [form, setValues] = useState({
    email:'',
    password:'',
    remember:''
  });

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (event, props) => {
    event.preventDefault();
    // dispatch(loginuser({...form}));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} >
      <Link href="/"><img src={logo} alt="background" /></Link>
      <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={form.password}
            onChange={updateField}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
            
        </form>
      </div>
    </Container>
  );
}

// const mapStateToProps =state=>{
//   return{
//     isLoggedIn: state.login.isLoggedIn
//   }
// }

// export default withRouter(connect(mapStateToProps,{ loginuser })(LoginContainer));