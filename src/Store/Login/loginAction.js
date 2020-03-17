import * as actionCreators from '../actionTypes';
import Axios from "axios";
import { base_url} from "../../Config/AppConfig";
import history from '../history';
import { getHeaders } from '../Common/Common';
import decode from 'jwt-decode';
// import { postCall, apiRequest } from '../../Services/Api';

//standard to follow

// export const loginuser =(data)=>{
//   return dispatch =>{
//     new Promise(function(resolve,reject){
//       Axios.post(base_url+"login", data,{headers:getHeaders()})
//       .then(response=>{
//         resolve(response);

//         return dispatch({

//         });
//       })
//       .catch(err=>{
//         reject(err);
//         return dispatch({

//         });
//       })
//     })
//   }
// }

// login action
export const loginuser =(data)=>{
  return dispatch =>{
    new Promise(function(resolve,reject){
      dispatch({
        type:actionCreators.LOGIN_CHECK,
      });
      
      Axios.post(base_url+'login',data,{headers:getHeaders()})
      .then(response=>{
        resolve(response);
          localStorage.setItem('token', response.data.token);
          const decoded = decode(response.data.token);
          dispatch({
            type:actionCreators.LOGIN_SUCCESS,
            payload:response.data
          });
          return history.push('/Home')
      })
      .catch(err=>{
        reject(err);
        return dispatch({
          type:actionCreators.LOGIN_ERROR,
          payload:err
        });
      })
    })
  }
}
// login action end

// Registration action
export const userRegistration =(data)=>{
  return dispatch =>{
    new Promise(function(resolve,reject){
      dispatch({
        type:actionCreators.USER_REGISTRATION_CHECK,
      });
      
      Axios.post(base_url+'register',data,{headers:getHeaders()})
      .then(response=>{
        resolve(response);
        if (response.data.status_code === 1000) {
          localStorage.setItem('token', response.data.token);
          dispatch({ type: actionCreators.USER_REGISTRATION_SUCCESS, payload: response.data });
          return history.push('/');
        } else if (response.data.status_code === 555) {
          return dispatch({ type: actionCreators.USER_REGISTRATION_ERROR, payload: "ERROR CODE - QUERY" })
        } else if (response.data.status_code === 999) {
          return dispatch({ type: actionCreators.USER_REGISTRATION_ERROR, payload: "ERROR CODE - GENERAL" })
        }
      })
      .catch(err=>{
        reject(err);
        return dispatch({
          type:actionCreators.LOGIN_ERROR,
          payload:err
        });
      })
    })
  }
}
// Registration action end

// Logout action
export const _logout =()=>{
  return dispatch =>{
    new Promise(function(resolve,reject){
      dispatch({
        type:actionCreators.LOGOUT_CHECK,
      });
      
      Axios.post(base_url+'logout',{},{headers:getHeaders()})
      .then(response=>{
        resolve(response);
          dispatch({
            type:actionCreators.LOGOUT_SUCCESS,
            payload:response.data
          });

          return history.push('/')
      })
      .catch(err=>{
        reject(err);
        return dispatch({
          type:actionCreators.LOGOUT_FAIL,
          payload:err
        });
      })
    })
  }
}
// Logout action end

//Check Email action
export const emailCheck =(data)=>{
    return dispatch =>{
      //post data
      const emaildata = {
        "email":data
    }

    // API CALL
      new Promise(function(resolve,reject){
        Axios.post(base_url+"email_unique_flag", emaildata,{headers:getHeaders()})
        .then(response=>{
          resolve(response);
          return dispatch({
            type:actionCreators.CHECK_EMAIL,
            payload:response.data
          });
        })
        .catch(err=>{
          reject(err);
          return dispatch({
            type:actionCreators.MAIL_ERROR,
            payload:err
          });
        })
      })
    }
  }
  
// Check email action end

// forgot password
// export function forgotPassword(data){
//   return dispatch => {
//     const email={
//       "email":data.email
//     }
//     Axios.post(base_url+'forget_password', email).then(
//       response => {
//         console.log(response);
//           if(response.data.status_code === 1000){
//             return dispatch({
//               type: actionCreators.FORGOT_PASSWORD_SUCCESS,
//               payload: response.data
//             })
//             // return history.push('/Home');
//           }else{
//             return dispatch({
//               type: actionCreators.FORGOT_PASSWORD_FAIL,
//               payload:response.data
//             })
//           }
//       }
//     ).catch(error => {
//      console.log(error.response);
//       return dispatch({
//         type: actionCreators.LOGIN_ERROR,
//         payload:error.response.data
//       })
//     })
//   }
// }

export const _forgotPassword =(data)=>{
    return dispatch =>{
      dispatch({
        type:actionCreators.FORGOT_PASSWORD_CHECK,
      });
      const email={
              "email":data.email
            }
      
      new Promise(function(resolve,reject){
        Axios.post(base_url+"forget_password", email,{headers:getHeaders()})
        .then(response => {
          console.log(response);
            if(response.data.status_code === 1000){
               dispatch({
                type: actionCreators.FORGOT_PASSWORD_SUCCESS,
                payload: response.data
              })
              // return history.push('/');
            }else{
              return dispatch({
                type: actionCreators.FORGOT_PASSWORD_FAIL,
                payload:response.data
              })
              // return history.push('/Home');
            }
        })
        .catch(err=>{
          reject(err);
          return dispatch({
            type: actionCreators.LOGIN_ERROR,
            payload:err.response.data
          });
        })
      })
    }
  }

//not used yet
export function checkToken(){
  return dispatch =>{
    const token =  localStorage.getItem('token');
    if(token){
      return history.push('/Home');
    }
  }
}


// Modal Entry list(we are creating Action here because we want our event code)
export const _modalList =()=>{
  return dispatch =>{
      dispatch({
          type:actionCreators.MODAL_LIST_CHECK,
      });

      new Promise(function(resolve,reject){


          Axios.post(base_url+"",{},{ headers: getHeaders()})
          .then(response=>{
              resolve(response);
              console.log("resp",response.data);
              dispatch({
                  type:actionCreators.MODAL_LIST_SUCCESS,
                  payload:response.data.data
              }) 
          })
          .catch(err=>{
              reject(err);
              dispatch({
                  type:actionCreators.MODAL_LIST_FAIL,
                  payload:err
              })
          });
      })
  }
}
  
//Modal Entry List end



