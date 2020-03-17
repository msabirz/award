import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    makeStyles,
    Card,
    CardContent,
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CssBaseline,
    Container,
    Snackbar,

} from '@material-ui/core';
import Title from '../../../Components/Common/Title';
import { _profileDataView, _updateProfileData } from '../../../Store/Setting/settingAction';
import Country from '../../onboarding/Country';
import MySnackbarContentWrapper from '../../../Components/Common/MySnackbarContentWrapper';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    card: {
        marginBottom: theme.spacing(3),
    },
}));

function ProfileView(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [form, setValues] = useState({
        first_name: "",
        last_name: "",
        company_name: "",
        email: "",
        country: "",
        old_password: "",
        new_password: "",
        updatepassword: false
    });
    const inputLabel = React.useRef(null);
    // const [labelWidth, setLabelWidth] = React.useState(0);
    const [ open, setOpen ] = React.useState(false);

    React.useEffect(() => {
        // setLabelWidth(inputLabel.current.offsetWidth);
    }, []);


    useEffect(() => {
        // const id = props.match.params.id
        dispatch(_profileDataView());
    }, []);

    useEffect(() => {
        setValues({
            first_name: props.showProfileData.first_name,
            last_name: props.showProfileData.last_name,
            company_name: props.showProfileData.company_name,
            email: props.showProfileData.email,
            country: props.showProfileData.country
        })
    }, [props.showProfileData]);

    const updateField = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (event, props) => {
        event.preventDefault();
        console.log("formdata", form)
        dispatch(_updateProfileData({ ...form }));
        setValues({
            ...form,
            updatepassword: true
        });
    };

    function handleClose(event, reason) {
        setValues({
            ...form,
            updatepassword: false
        })
	}

    return (
        <Container component="main" maxWidth="lg">
			<CssBaseline />
        <div className={classes.root}>
            {props.roleId == 3 ?
            <Card style={{ padding: 15 }}>
            <CardContent>
                <form onSubmit={onSubmit}>  
                    <Card className={classes.card}>
                        <CardContent>
                            <Title variant="h5">Profile Edit</Title>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="first_name"
                                        name="first_name"
                                        label="First Name"
                                        fullWidth
                                        autoComplete="first_name"
                                        value={form.first_name}
                                        onChange={updateField}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="last_name"
                                        name="last_name"
                                        label="Last Name"
                                        fullWidth
                                        autoComplete="last_name"
                                        value={form.last_name}
                                        onChange={updateField}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="company_name"
                                        name="company_name"
                                        label="Company Name"
                                        fullWidth
                                        autoComplete="company_name"
                                        value={form.company_name}
                                        onChange={updateField}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="email"
                                        name="email"
                                        label="Email Id"
                                        fullWidth
                                        autoComplete="email"
                                        value={form.email}
                                        onChange={updateField}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={classes.formControl} fullWidth>
                                        <InputLabel ref={inputLabel}>
                                            Country
                            </InputLabel>
                                        <Select
                                            value={form.country}
                                            onChange={updateField}
                                            required
                                        >
                                            {Country.map((data, index) => {
                                                return (
                                                    <MenuItem value={data.name} key={index}>
                                                        {data.name}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardContent>
                            <Title variant="h5">Change Password</Title>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="old_password"
                                        name="old_password"
                                        label="Old Password"
                                        fullWidth
                                        autoComplete="old_password"
                                        value={form.old_password}
                                        onChange={updateField}
                                        type="password"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="new_password"
                                        name="new_password"
                                        label="New Password"
                                        fullWidth
                                        autoComplete="new_password"
                                        value={form.new_password}
                                        onChange={updateField}
                                        type="password"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>Submit</Button>
                </form>
            </CardContent>
        </Card>
        :
        <Card style={{ padding: 15 }}>
                <CardContent>
                    <form onSubmit={onSubmit}>  
                        <Card className={classes.card}>
                            <CardContent>
                                <Title variant="h5">Profile Edit</Title>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="first_name"
                                            name="first_name"
                                            label="First Name"
                                            fullWidth
                                            autoComplete="first_name"
                                            value={form.first_name}
                                            onChange={updateField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="last_name"
                                            name="last_name"
                                            label="Last Name"
                                            fullWidth
                                            autoComplete="last_name"
                                            value={form.last_name}
                                            onChange={updateField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="email"
                                            name="email"
                                            label="Email Id"
                                            fullWidth
                                            autoComplete="email"
                                            value={form.email}
                                            onChange={updateField}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>Submit</Button>
                    </form>
                </CardContent>
            </Card>
         }
        

            
        </div>
        {form.updatepassword ? 
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={form.updatepassword}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <MySnackbarContentWrapper
                    onClose={handleClose}
                    variant="success"
                    message="Profile Updated Successfully"
                />
            </Snackbar>
        : null}
        </Container>
    );
}
const mapStateToProps = (state) => {
    return {
        showProfileData: state.setting.profileData,
        roleId: state.login.roleId
    }
}

export default withRouter(connect(mapStateToProps, { _profileDataView, _updateProfileData })(ProfileView));