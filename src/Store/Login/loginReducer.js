import * as actionCreators from '../actionTypes';
import { REHYDRATE, PERSIST } from 'redux-persist';

const initialState = {
  data:[],
  token:null,
  roleId:null,
  errorMail: null,
  errroMailStatus:null,
  isLoginLoading:false,
  isLoggedIn:false,
  loginError:false,
  registrationSuccess:false,
  userData:{},
  latest_events:[],
  logoutData:[],
  isLogoutLoading: false,
  forgot_password_msg:null,
  modalList:[],
  isLoading: false
  // data:null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {

    case REHYDRATE:
      return{
        ...state,
        isLoggedIn:false,
        loginError:false,
      };

    // login reducer
    case actionCreators.LOGIN_CHECK:
      return {
        ...state,
        isLoginLoading:true,
        loginError:false,
      };

    case actionCreators.LOGIN_SUCCESS:
      return {
        ...state,
        // userData:action.payload,
        // latest_events:action.payload.data.latest_events,
        token:action.payload.token,
        roleId:action.payload.role_id,
        isLoginLoading:false,
        isLoggedIn:true,
        loginError:false,
      };

    case actionCreators.LOGIN_ERROR:
      return { 
        ...state,
        isLoginLoading:false,
        isLoggedIn:false,
        loginError:true,
      };
    // login reducer end

    // Registration reducer
    case actionCreators.USER_REGISTRATION_CHECK:
      return {
        ...state,
        data:action.payload,
        isLoginLoading:true,
      };

    case actionCreators.USER_REGISTRATION_SUCCESS:{
      return{
        ...state,
        registrationSuccess:true
      }
    }
    case actionCreators.USER_REGISTRATION_ERROR:{
      return{
        ...state,
        registrationSuccess:false
      }
    }
    // Registration reducer end

    // Logout reducer
    case actionCreators.LOGOUT_CHECK:
      return {
        ...state,
        isLogoutLoading:true,
      };

    case actionCreators.LOGOUT_SUCCESS:{
      return{
        ...state,
        logoutData:action.payload,
        isLogoutLoading:false
      }
    }
    case actionCreators.LOGOUT_FAIL:{
      return{
        ...state,
        isLogoutLoading:false
      }
    }
    // Logout reducer end

    // forgot password reducer
    case actionCreators.FORGOT_PASSWORD_CHECK:{
      return{
        ...state,
        isLoading: true
      }
    }
    case actionCreators.FORGOT_PASSWORD_SUCCESS:{
      return{
        ...state,
        forgot_password_msg:action.payload.data,
        isLoading: false
      }
    }
    case actionCreators.FORGOT_PASSWORD_FAIL:{
      return{
        ...state,
        isLoading: false
      }
    }
  // forgot password reducer end

  // Email check reducer
    case actionCreators.CHECK_EMAIL:
      return {
        ...state,
        errroMailStatus:action.payload.status,
        errorMail:action.payload.data
      };

    case actionCreators.MAIL_ERROR:{
      return {
        ...state,
        errroMailStatus:false,
        errorMail:action.payload
      }
    }
    // Email check reducer end

     //Modal Entry list
     case actionCreators.MODAL_LIST_CHECK:
      return {
      ...state,
      isLoading:true,
      };
    case actionCreators.MODAL_LIST_SUCCESS:{
      return {
        ...state,
        entryList:action.payload,
        isLoading:false
      }
    }
    case actionCreators.MODAL_LIST_FAIL:{
      return {
        ...state,
        isLoading:false,
      }
    }
    //Modal Entry list end


    default:
      return { ...state };
  }
};
export default loginReducer;
