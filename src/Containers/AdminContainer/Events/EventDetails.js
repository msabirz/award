import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles, Card, CardMedia, Paper, Grid, CardContent, Button, Divider } from '@material-ui/core';
import Title from '../../../Components/Common/Title';
import { _eventDetail } from '../../../Store/Events/EventsAction';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  media: {
    height: 200,
  },
  card: {
    maxWidth: 200,
    height: 200,
    alignItems: 'center',
    display: 'block',
    margin: 'auto',
  },
  cardContent: {

    margin: 30,
    color: '#262626',
    padding: 40,
    width:'100%'
  },
  entry: {
    margin: theme.spacing(2, 0, ),
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
  headingContainer: {
    textAlign: 'center',
    display: 'block',
  },
  eventLink: {
    textDecoration: 'none',
    paddingBottom: 5
  },
  box: {
    paddingBottom: 10
  },
  linkEmail: {

    textDecoration:'none'
  },
  divider: {
    display:'block'
  }

}));

const setupEntryForm = () => {
  // history.push('/Home/Events/Details/'+id)
}

function EventDetails(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
  const seo_keyword = props.location.state.seo_keyword;
    dispatch(_eventDetail(seo_keyword));
  },[]);


  return (
    <div>
      {console.log("event deatil",props.eventDetails[0])}
      <Title>Event Details</Title>
      <Paper className={classes.root}>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://picsum.photos/200/300"
                title="Contemplative Reptile"
              />
            </Card>
            <div className={classes.headingContainer}>
            <Title variant="h5" color='textSecondary'>The Voice Audition</Title>

            <a href="https://www.google.com" className={classes.eventLink}>EVENT LINK</a> <br />
            <Button type="submit" size="medium" variant="contained" color="primary"className={classes.entry} onClick={setupEntryForm}>Setup Entry Form</Button>
            </div>
          </Grid>

          <Card className={classes.cardContent}>
            <CardContent>
              <Grid container>
                <Grid item xs={12} className={classes.box}>
                <Title variant="h5" color="primary" >Basic Information</Title>
                  <Divider component="li" className={classes.divider} />
                  <Title variant='h6' color='secondary'>
                    <span><strong>Start Date:</strong> 
                    {props.eventDetails.start_date}
                    </span>
                  </Title>
                  <Title variant='h6' color='secondary'>
                    <span><strong>End Date:</strong>
                    {props.eventDetails.end_date}
                    </span>
                  </Title>
                  <Title variant='h6' color='secondary'>
                    <span><strong>Submission Deadline:</strong>
                    {props.eventDetails.submission_deadline}
                    </span>
                  </Title>
                  <Title variant='h6' color='secondary'>
                    <span><strong>Description:</strong>
                    {props.eventDetails.description}
                    </span>
                  </Title>
                </Grid>

                <Grid item xs={12}>
                  <Title variant="h5" color="primary" >Mail Information</Title>
                  <Divider component="li" className={classes.divider} />
                  <Title variant='h6' color='secondary'>
                    <span><strong>Main Contact Email:</strong> <a href="mailto:someone@example.com?Subject=Hello%20again" className={classes.linkEmail}>{props.eventDetails.main_contact_email}</a></span>
                  </Title>
                  <Title variant='h6' color='secondary'>
                    <span><strong>Other Contact Email:</strong> <a href="mailto:someone@example.com?Subject=Hello%20again" className={classes.linkEmail}>{props.eventDetails.other_contact_email}</a></span>
                  </Title>
                  <Title variant='h6' color='secondary'>
                    <span><strong>Mail Signature:</strong> <a href="mailto:someone@example.com?Subject=Hello%20again" className={classes.linkEmail}>{props.eventDetails.mail_signature}</a></span>
                  </Title>
                  <Title variant='h6' color='secondary'>
                    <span><strong>Outgoing Mail Sender:</strong> <a href="mailto:someone@example.com?Subject=Hello%20again" className={classes.linkEmail}>{props.eventDetails.outgoing_mail_sender}</a></span>
                  </Title>
                  <Title variant='h6' color='secondary'>
                    <span><strong>Reply to Email:</strong> <a href="mailto:someone@example.com?Subject=Hello%20again" className={classes.linkEmail}>{props.eventDetails.reply_to_email}</a></span>
                  </Title>
                </Grid>
              </Grid>
            </CardContent>

          </Card>

        </Grid>

      </Paper>
    </div>
  );
}
const mapStateToProps = (state) =>{
  return{
    eventDetails: state.events.detailEvent,
  }
}
export default withRouter(connect(mapStateToProps,{_eventDetail})(EventDetails));