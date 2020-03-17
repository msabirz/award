import * as actionCreators from '../actionTypes';
import Axios from "axios";
import { base_url } from "../../Config/AppConfig";
import history from '../history';
import { getHeaders } from '../Common/Common';

export const _profileDataView =()=>{
    // const data={
    //     "id":id
    // }
    return dispatch =>{
        dispatch({
            type:actionCreators.PROFILE_SHOW_CHECK,
        });

        new Promise(function(resolve,reject){

            Axios.post(base_url+'user/edit',{},{ headers: getHeaders()})
            .then(response=>{
                resolve(response);
                dispatch({
                    type:actionCreators.PROFILE_SHOW_SUCCESS,
                    payload:response.data.data
                });
            })
            .catch(err=>{
                reject(err);
                dispatch({
                    type:actionCreators.PROFILE_SHOW_FAIL,
                    payload:err
                })
            });
        })
    }
}

export const _updateProfileData =(data)=>{
    return dispatch =>{

      const profileData = {
        "first_name":data.first_name,
        "last_name":data.last_name,
        "company_name":data.company_name,
        "email":data.email,
        "country":data.country,
        "old_password":data.old_password,
        "new_password":data.new_password
        }

      new Promise(function(resolve,reject){

          dispatch({
              type:actionCreators.UPDATEPROFILE_SAVE_CHECK,
            });

        Axios.post(base_url+"user/update",profileData,{headers:getHeaders()})
        .then(response=>{
          resolve(response);
          if(response.data.status_code === 1000){
           return dispatch({
                type:actionCreators.UPDATEPROFILE_SAVE_SUCCESS,
                payload:response.data
            });  
            }
        })
        .catch(err=>{
          reject(err);
          return dispatch({
              type:actionCreators.UPDATEPROFILE_SAVE_FAIL,
              payload:err
          });
        })
      })
    }
  }