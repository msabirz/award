import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
import moment from "moment";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { useFileDrop } from '../../../Components/Common/useFileDrop'
import { _saveEvent } from '../../../Store/Events/EventsAction';
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
    margin: "0px auto"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  card: {
    marginBottom: theme.spacing(3),
  },
  uploadbox: {
    /* some styles */
},

uploadboxdrag: {
  position: 'relative',
  /* more styles */
},

// uploadboxdrag: "&: before" {
//   position: absolute,
//   content: 'Drop file to upload',
//   top: 50,
//   left: 0,
//   right: 0,
//   width: 100,
//   textAlign: center,
//   transform: translateY(-50),
//   /* colors, etc. */
// }
}));


function AddEvent(props) {
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
  });



  // handle change for datepicker


  // const [selectedTime, setSelectedTime] = useState(new Date());
  const { DropBox, HiddenInput, onClick, drag } = useFileDrop(props);

  const updateField = e => {
    console.log("value",e.target.value)
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  
  function handleStartDateChange(date) {
  const startDate = moment(date).format("MM/DD/YYYY");
    setValues({
      ...form,
      selectedStartDate : startDate,
    });
  }

  
  function handleEndDateChange(date) {
    const endDate = moment(date).format("MM/DD/YYYY");
    setValues({
      ...form,
      selectedEndDate : endDate,
    });
  }

  
  function handleSubmissionDateChange(date) {
    console.log('SUBMIT DATE !! ',date);
    const submitDate = moment(date).format("MM/DD/YYYY");
    console.log('SUBMIT DATE !! ',submitDate);
    setValues({
      ...form,
      selectedSubmissionDate : submitDate,
    });
  }

  // function handleTimeChange(date) {
  //   const time = moment(date).format("hh:mm:ss");
   
  //   setValues({
  //     ...form,
  //     selectedTime : date,
  //     time:time
  //   });
    
  // }

  const onSubmit = (event, props) => {
    event.preventDefault();
    console.log("formdata",form)
		dispatch(_saveEvent({ ...form }));
  };
  


  return (
    <div className={classes.root}>
      <Card style={{ padding: 15 }}>
        <CardContent>
          <Title> Add New Event </Title>
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
                          minDate={new Date()}
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
            <Card style={{ padding: 15 }}>
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
export default withRouter(connect(null, {_saveEvent})(AddEvent));
