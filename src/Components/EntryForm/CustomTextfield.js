import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  makeStyles, 
  TextField,
  Grid
} from '@material-ui/core';

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
  
}));


function CustomTextfield(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
         <TextField {...props.formData} onChange={props.updateField} fullWidth />
        </Grid>
      </Grid>
    </div>
  );
}
export default withRouter(connect(null, {})(CustomTextfield));
