import React,{useState, useEffect} from 'react';
import {
  Container,
  makeStyles,
  Typography,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  Snackbar,
} from '@material-ui/core';
import {loginuser} from '../../Store/Login/loginAction';
import logo from '../../images/logo.png';
import {connect,useDispatch} from 'react-redux';
// import history from '../../Store/history';
import { withRouter } from 'react-router-dom';
import MySnackbarContentWrapper from '../../Components/Common/MySnackbarContentWrapper';


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

function LoginContainer(props) {

  useEffect(()=>{
    // if(props.isLoggedIn){
    //   history.push('/Home');
    // }
  })
  const classes = useStyles();
  const dispatch = useDispatch();

  const [form, setValues] = useState({
    email:'',
    password:'',
  });

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (event, props) => {
    event.preventDefault();
    dispatch(loginuser({...form}));

  };

  function handleClose(event, reason,) {
		if (reason === 'clickaway') {
			return;
		}
		setValues({
			...form,
			// errorPassword: false
		})
		// event.target.reset(); 
	}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Link href="/"><img src={logo} alt="background" /></Link>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={form.email}
            onChange={updateField}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={form.password}
            onChange={updateField}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/ForgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/Register" variant="body2">
                {/* {"Don't have an account? Sign Up"} */}
                Register Now
              </Link>
            </Grid>
          </Grid>
        </form>
      
        {props.loginError ? 
				<Snackbar
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					open={true}
					autoHideDuration={2000}
					
				>
					<MySnackbarContentWrapper
						variant="error"
						message="Email or Password Mismatched"
					/>
				</Snackbar>
			: null}
      </div>
    </Container>
  );
}

const mapStateToProps = (state) =>{
  console.log("loginError",state.login.loginError)
  return{
    loginError: state.login.loginError
  }
}

export default withRouter(connect(mapStateToProps,{ loginuser })(LoginContainer));