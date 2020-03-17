import React, { useState, useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  makeStyles, 
  Radio,
  RadioGroup,
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel
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
  formControl: {
    margin: theme.spacing(3),
  },
}));


function CustomRadioButton(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [form, setValues] = useState({
    value: ""
  });

  useEffect(()=>{
    setValues({
      value: props.name
    })
  })

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{props.lable}</FormLabel>
        <RadioGroup aria-label={props.lable} name={props.name} value={form.value} onChange={handleChange}>
          <FormControlLabel value={form.value} control={<Radio />} label={props.lable} />
        </RadioGroup>
      </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
export default withRouter(connect(null, {})(CustomRadioButton));
