import { combineReducers } from "redux";
//persist
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//All reducers
import loginReducer from "./Login/loginReducer";
import eventsReducer from "./Events/EventsReducer";
import entryFormReducer from './EntryForm/EntryFormReducer';
import entryReducer from "./Entry/EntryReducer";
import settingReducer from "./Setting/settingReducer";
import entrantReducer from "./Entrant/EntrantReducer";

const persistConfig = {
  key: 'root',
  storage,
}


const rootReducer =(combineReducers({
  login: persistReducer(persistConfig,loginReducer),
  events:eventsReducer,
  entryForm:entryFormReducer,
  entry:entryReducer,
  setting:settingReducer,
  entrant:entrantReducer
}));
export default rootReducer;
