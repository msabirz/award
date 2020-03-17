// import React,{Component} from 'react';
// import login from './Styles/loginContainer.module.css';
// import {
//     Form, Icon, Input, Button,Layout,notification
//   } from 'antd';
// import {NavLink} from 'react-router-dom';

// //Redux
// import {connect} from 'react-redux';

// import {forgotPassword} from '../../Store/Login/loginAction';

// const {Content} = Layout;


// class ForgotPassword extends Component {

//     handleSubmit = (e) => {
//         e.preventDefault();
//         this.props.form.validateFields((err, values) => {
//           if (!err) {
//             this.props.dispatch(forgotPassword(values))
//           }
//         });
//       }

//       componentDidUpdate(prevProps){
//         if(prevProps.errorMessage !== this.props.errorMessage){
//           notification['success']({
//             message: this.props.errorMessage,
//             duration: 3,
//           });
//         }
//       }
// render() {
//         const { getFieldDecorator } = this.props.form;

//         return (
//           <Layout className={login.maindiv}>
//             <div className={login.topDiv} ></div>

//             <Layout className={login.loginForm}>
//             <div style={{flex:1,textAlign:'center'}}>
//             <NavLink to="/"> <img src={require('../../images/logo.png')} alt="logo" /></NavLink>
//             </div>
//             <Content className={login.contentSection}>
//                         <Form onSubmit={this.handleSubmit} className="login-form">
//                         <Form.Item>
//                         {getFieldDecorator('email', {
//                             rules: [{ required: true, message: 'Please input your Email' }],
//                         })(
//                             <Input type="email" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
//                         )}
//                         </Form.Item>

//                         <Form.Item style={{textAlign:"center"}}>
//                         <Button type="primary" htmlType="submit" className={login.btnPrimary} size="large">
//                             Submit
//                         </Button>{" "}

//                         </Form.Item>

//                     </Form>
//                     <div style={{textAlign:"center"}}>
//                         <NavLink className={"login-form-forgot "+login.Link} to="/">Login</NavLink>
//                         <br/><br/>
//                       Or <NavLink to="/Register" className={login.Link}>Register Now</NavLink>
//                     </div>
//             </Content>

//             </Layout>

//           </Layout>
//         );
//     }
// }

// const ForgotPasswordContainer = Form.create({ name: 'normal_login' })(ForgotPassword);

// const mapStateToProps = (state) =>{
//   return{
//     errorMessage: state.login.forgot_password_msg
//   }
// }

// export default connect(mapStateToProps)(ForgotPasswordContainer);




import React, { useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
  Avatar,
  Box
} from '@material-ui/core';
import logo from '../../images/logo.png';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { _forgotPassword } from '../../Store/Login/loginAction';

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

function LoginContainer() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [form, setValues] = useState({
    email: '',
    password: '',
    remember: ''
  });

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (event, props) => {
    event.preventDefault();
    dispatch(_forgotPassword({ ...form }));
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Link href="/"><img src={logo} alt="background" /></Link>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        {/* <Typography component="h1" variant="h5">
          Sign in
        </Typography> */}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          <Grid container justify="center">
						<Grid item>
							<Link href="/" variant="body2">
								Sign in
							</Link>
						</Grid>
					</Grid>
        </form>
      </div>
    </Container>
  );
}
export default withRouter(connect(null, { _forgotPassword })(LoginContainer));