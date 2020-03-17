import { createStore, applyMiddleware,compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistStore } from 'redux-persist'
import rootReducer from "./combineReducers";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );


const store = createStore(
  rootReducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  composeEnhancers(applyMiddleware(thunkMiddleware))
);



let persistor = persistStore(store)

export { store,persistor  };
