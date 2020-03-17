// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
//

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import history from './Store/history';
import { store } from "./Store/store";
import { Router} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

    const theme = createMuiTheme({
        palette: {
        primary: {main:'#039be5'},
        secondary: {main: '#212834',},
        },
    });

ReactDOM.render(
<Provider store={store}>
 <MuiThemeProvider theme={theme}>

    <Router history={history} basename="/">
        <App />
    </Router>
</MuiThemeProvider>

</Provider>, document.getElementById('root'));
