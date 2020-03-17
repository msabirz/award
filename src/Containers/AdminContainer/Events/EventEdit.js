import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useFileDrop } from '../../../Components/Common/useFileDrop';
import {
  makeStyles,
  Card,
  CardContent,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Grid,
  TextField,
  Typography,
  Button
} from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers'

import { _showEvent, _updateEvent } from '../../../Store/Events/EventsAction';
import Title from '../../../Components/Common/Title';
import Timezone from './Timezone';
import { isToday } from 'date-fns';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  Grid: {
    textAlign: "center",
  },
  grid: {
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  card: {
    marginBottom: theme.spacing(3),
  }
}));

function EventEdit(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [form, setValues] = useState({
    eventName: '',
    eventStatus: '',
    selectedStartDate: new Date(),
    selectedEndDate: new Date(),
    selectedSubmissionDate: new Date(),
    selectedTime:new Date(),
    timezone:Timezone[73].utc[0],
    description: '',
    replyToEmail: '',
    outgoingMail: '',
    mailSignature: '',
    otherContactEmail: '',
    mailContactEmail: '',
    fileList: ["test"],
    id:''
  });
  // handle change for datepicker
  const [selectedStartDate, setSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [selectedSubmissionDate, setSelectedSubmissionDate] = useState(new Date());
  // const [selectedTime, setSelectedTime] = useState(new Date());
  const { DropBox, HiddenInput, onClick, drag } = useFileDrop(props);


  useEffect(() => {
    const seo_keyword = props.history.location.state.seo_keyword;
    const id =props.history.location.state.id;
    console.log("TEST ",props.history.location.state.seo_keyword);

    dispatch(_showEvent(seo_keyword,id));
  },[]);

  useEffect(()=>{
    // console.log(" ppppppp ==> ",props.showEventData);

    const startDate = moment(props.showEventData.start_date).format('MM/DD/YYYY');
    const endDate = moment(props.showEventData.end_date).format('MM/DD/YYYY');
    const submissionDate = moment(props.showEventData.submission_deadline).format('MM/DD/YYYY');
    // console.log(" start Date ==> ",startDate);
    // console.log(" end Date ==> ",endDate);
    // console.log(" submission Date ==> ",submissionDate);

      setValues({
        eventName: props.showEventData.name,
        eventStatus: props.showEventData.status,
        selectedStartDate: startDate,
        selectedEndDate: endDate,
        selectedSubmissionDate: submissionDate,
        timezone:props.showEventData.timezone,
        description: props.showEventData.description,
        replyToEmail: props.showEventData.reply_to_email,
        outgoingMail: props.showEventData.outgoing_mail_sender,
        mailSignature: props.showEventData.mail_signature,
        otherContactEmail:props.showEventData.other_contact_email,
        mailContactEmail: props.showEventData.main_contact_email,
        // fileList: ["test"],
        id:props.showEventData.id
      })
  },[props.showEventData])

  console.log("props  ==> ",props.showEventData)

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  
  function handleStartDateChange(date) {
    const startDate = moment(date).format("MM-DD-YYYY");
    setValues({
      ...form,
      selectedStartDate : startDate,
    });
  }

  
  function handleEndDateChange(date) {
    // setSelectedEndDate(date);
    const endDate = moment(date).format("MM-DD-YYYY");
    setValues({
      ...form,
      selectedEndDate : endDate,
    });
  }

  
  function handleSubmissionDateChange(date) {
    const submitDate = moment(date).format("MM-DD-YYYY");
    setValues({
      ...form,
      selectedSubmissionDate : submitDate,
    });
  }

  function handleTimeChange(date) {
    const time = moment(date).format("hh:mm:ss");
   
    setValues({
      ...form,
      selectedTime : date,
      time:time
    });
    
  }

  const onSubmit = (event, props) => {
    event.preventDefault();
    console.log("formdata",form)
		dispatch(_updateEvent({ ...form }));
  };
  


  return (
    <div className={classes.root}>
    <Card style={{ padding: 15 }}>
      <CardContent>
        <Title> Edit Event </Title>
        <form onSubmit={onSubmit}>
          <Card className={classes.card}>
            <CardContent>
            <Typography variant="h6" color="inherit" >Basic Information</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="eventName"
                    name="eventName"
                    label="Event Name"
                    fullWidth
                    autoComplete="eventName"
                    value={form.eventName}
                    onChange={updateField}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl required className={classes.formControl} fullWidth={true}>
                    <InputLabel htmlFor="eventStatus-required">Event Status</InputLabel>
                    <Select
                      value={form.eventStatus}
                      onChange={updateField}
                      name="eventStatus"
                      inputProps={{
                        id: 'eventStatus-required',
                      }}
                      className={classes.selectEmpty}
                    >
                      <MenuItem value={10}>one</MenuItem>
                      <MenuItem value={20}>Two</MenuItem>
                      <MenuItem value={30}>Three</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <Grid container className={classes.grid}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="eventStartDate"
                        label="Event start Date"
                        value={form.selectedStartDate}
                        onChange={date=> handleStartDateChange(date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        fullWidth={true}
                        format="yyyy/MM/dd"
                        minDate={new Date(isToday)}
                        required
                      />

                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <Grid container className={classes.grid}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="eventEndDate"
                        label="Event End Date"
                        value={form.selectedEndDate}
                        onChange={date=> handleEndDateChange(date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        fullWidth={true}
                        format="yyyy/MM/dd"
                        minDate={new Date(form.selectedStartDate)}
                        required
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>

                 <Grid item xs={12} sm={6}>
                  {/* <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <Grid container className={classes.grid}>
                      <KeyboardTimePicker
                        margin="normal"
                        id="eventTime"
                        label="Time Zone"
                        value={form.selectedTime}
                        onChange={date => handleTimeChange(date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                        fullWidth={true}
                        format="hh:mm"
                        minDate={new Date()}
                        required
                      />
                    </Grid>
                  </MuiPickersUtilsProvider> */}
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel htmlFor="age-required">Timezone</InputLabel>
                      <Select
                        value={form.timezone}
                        onChange={updateField}
                        name="timezone"
                        className={classes.selectEmpty}
                      >
                        {Timezone.map((data, index) => {
                          return (
                            <MenuItem value={data.utc[0]} key={index}>
                              {data.text}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid> 

                 <Grid item xs={12} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <Grid container className={classes.grid}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="eventSubmissionDate"
                        label="Submission Deadline"
                        value={form.selectedSubmissionDate}
                        onChange={date => handleSubmissionDateChange(date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        fullWidth={true}
                        format="yyyy/MM/dd"
                        // minDate={new Date()}
                        required
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid> 

                <Grid item xs={12} sm={12}>
                  <FormControl className={classes.formControl} fullWidth={true}>
                    <TextField
                      variant="outlined"
                      placeholder="Description"
                      multiline={true}
                      rows={2}
                      rowsMax={7}
                      name='description'
                      id='description'
                      value={form.description}
                      onChange={updateField}
                    />
                  </FormControl>
                </Grid>
                
                {/* <Grid item xs={12} sm={12}>
                <div>
                <HiddenInput />
                <DropBox className={`upload-box ${drag ? 'drag' : ''}`}>
                  <div>Drag and drop files to upload.</div>
                </DropBox>
                <Button primary onClick={onClick}>
                  Upload file
                </Button>
              </div>
              </Grid> */}

              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
            <Typography variant="h6" color="inherit" >Mail Information</Typography>
              <Grid container spacing={3}>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="mailContactEmail"
                    name="mailContactEmail"
                    label="Mail Contact Email"
                    fullWidth
                    type='email'
                    autoComplete="mailContactEmail"
                    value={form.mailContactEmail}
                    onChange={updateField}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="otherContactEmail"
                    name="otherContactEmail"
                    label="Other Contact Email"
                    fullWidth
                    type='email'
                    autoComplete="otherContactEmail"
                    value={form.otherContactEmail}
                    onChange={updateField}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="mailSignature"
                    name="mailSignature"
                    label="Mail Signature"
                    fullWidth
                    autoComplete="mailSignature"
                    value={form.mailSignature}
                    onChange={updateField}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="outgoingMail"
                    name="outgoingMail"
                    label="Outgoing Mail Sender"
                    fullWidth
                    autoComplete="outgoingMail"
                    value={form.outgoingMail}
                    onChange={updateField}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="replyToEmail"
                    name="replyToEmail"
                    label="Reply To Email"
                    fullWidth
                    type='email'
                    autoComplete="replyToEmail"
                    value={form.replyToEmail}
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
    </div>
      );
}
const mapStateToProps = (state) =>{
  return{
    showEventData: state.events.singleEvent,
  }
}

export default withRouter(connect(mapStateToProps, {_showEvent, _updateEvent})(EventEdit));