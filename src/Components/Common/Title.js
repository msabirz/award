import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function Title(props) {
  return (
    <Typography component={props.component} variant={props.variant} color={props.color} gutterBottom {...props}>
      {props.children}
    </Typography>
  );
}

Title.defaultProps = {
  component:"h2",
  color:"primary",
  variant:"h6",   
}

Title.propTypes = {
  children: PropTypes.node,
  component:PropTypes.any,
  color:PropTypes.string,
  variant:PropTypes.any,
};