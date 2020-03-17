import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import { emailCheck, userRegistration } from '../../Store/Login/loginAction';
import {
	FormControl,
	Select,
	MenuItem,
	InputLabel,
	OutlinedInput,
	TextField,
	CssBaseline,
	Button,
	makeStyles,
	Typography,
	Container,
	Grid,
	Link,
	Input,
	Snackbar
} from '@material-ui/core';
import logo from '../../images/logo.png';

// //import Country list
import Country from './Country';
import MySnackbarContentWrapper from '../../Components/Common/MySnackbarContentWrapper';
import { base_url } from '../../Config/AppConfig';
import { getHeaders } from '../../Store/Common/Common';
import validator from 'validator' 

const useStyles = makeStyles((theme) => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white
		}
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	formControl: {
		margin: 0,
		fullWidth: true,
		display: 'flex',
		wrap: 'nowrap'
	},
	close: {
		padding: theme.spacing(0.5)
	}
}));

function RegistrationForm(props) {
	const classes = useStyles();

	const [ form, setValues ] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		country: '',
		companyName: '',
		errorPassword: false,
		showErrorEmail:false
	});

	const inputLabel = React.useRef(null);
	const [ labelWidth, setLabelWidth ] = React.useState(0);

	React.useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	const dispatch = useDispatch();

	const updateField = (e) => {
		console.log('events', e.target);
		setValues({
			...form,
			[e.target.name]: e.target.value
		});
	};

	function handleClose(event, reason,) {
		if (reason === 'clickaway') {
			return;
		}
		setValues({
			...form,
			errorPassword: false
		})
		// event.target.reset(); 
	}

	const onSubmit = (event, props) => {
		event.preventDefault();
  
		const data={
			"email":form.email
		  }
  
		new Promise(function(resolve,reject){
		  Axios.post(base_url+'email_unique_flag',data,{headers:getHeaders()})
		.then(response=>{
		  if(response.data.success == true){
			submit();
			resolve(response);
		  }else{
			setValues({
				...form,
				email:"",
				showErrorEmail: true
			  });
			  resolve(response);
		  }
  
		})
		.catch(err=>{
		  reject(err);
		  setValues({
			...form,
			showErrorEmail: true
		  });
		  
		})
  
		});
	  };

	const submit = (event, props) => {
		const { password, confirmPassword } = form;
		console.log('password', password);

		// perform all neccassary validations
		if (password !== confirmPassword) {
			// alert("Passwords don't match");

			setValues({
				...form,
				errorPassword: true
			});
		} else {
			dispatch(userRegistration({ ...form }));
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
			<Link href="/"><img src={logo} alt="background" /></Link>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} onSubmit={onSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								value={form.firstName}
								onChange={updateField}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
								value={form.lastName}
								onChange={updateField}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								type="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								value={form.email}
								onChange={updateField}
							/>
							{form.showErrorEmail ? 
							<div style={{color:"red"}}>
								Email Name already exits
							</div>
                			: null}
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="moblie"
								type="tel"
								label="Mobile No."
								name="mobile"
								autoComplete="mobile"
								value={form.mobile}
								onChange={updateField}
								validator={validator.isMobilePhone}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="companyName"
								label="Company Name"
								name="companyName"
								autoComplete="companyname"
								value={form.companyName}
								onChange={updateField}
							/>
						</Grid>
						<Grid item xs={12} md={12}>
							<FormControl variant="outlined" className={classes.formControl}>
								<InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
									Country
								</InputLabel>
								<Select
									value={form.country}
									onChange={updateField}
									input={
										<OutlinedInput
											labelWidth={labelWidth}
											name="country"
											id="outlined-age-simple"
										/>
									}
								>
									{Country.map((data, index) => {
										return (
											<MenuItem value={data.code} key={index}>
												{data.name}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
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
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="confirmPassword"
								label="Confirm Password"
								type="password"
								id="confirmpassword"
								autoComplete="current-password"
								value={form.confirmPassword}
								onChange={updateField}
							/>
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Register Now
					</Button>
					<Grid container justify="center">
						<Grid item>
							<Link href="/" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			{form.errorPassword ? 
				<Snackbar
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					open={form.errorPassword}
					autoHideDuration={6000}
					onClose={handleClose}
				>
					<MySnackbarContentWrapper
						onClose={handleClose}
						variant="error"
						message="Password Mismatched"
					/>
				</Snackbar>
			: null}
		</Container>
	);
}
// const mapStateToProps = (state) => ({
//   todos: state.todos
// });

export default  withRouter(connect(null, { userRegistration, emailCheck })(RegistrationForm));
