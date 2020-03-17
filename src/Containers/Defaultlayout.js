// import React from 'react';
// import { Layout } from 'antd';

// const {
//   Content,
// } = Layout;

// export default class DefaultLayout extends React.Component {
//     state = {  }
//     render() {
//         return (
//             <Content style={{ padding: '0 50px',marginTop:30,marginLeft:'15%' }}>
//                {this.props.children}
//             </Content>
//         );
//     }
// }

import React from 'react';
import { makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
 
}));

export default function DefaultLayout(props) {
  const classes = useStyles();
  return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        {props.children}
        </Container>
      </main>
  );
}