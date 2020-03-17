import React from 'react';
import { makeStyles, Typography, Container, CssBaseline} from '@material-ui/core';
// import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // minHeight: '100vh',
    alignItems:'center'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'transparent',
    // textAlign: 'center'
  },
}));


export function MainFooter() {
  const classes = useStyles();
    return(
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">App © 2019 Created by Awards</Typography>
        </Container>
      </footer>
      
    </div>
    );
}

export default MainFooter;
