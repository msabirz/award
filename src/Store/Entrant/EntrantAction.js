import * as actionCreators from '../actionTypes';
import Axios from "axios";
import { base_url } from "../../Config/AppConfig";
import history from '../history';
import { getHeaders } from '../Common/Common';
import {store} from '../store';

// Entrant List
export const _entrantList =()=>{
    return dispatch =>{
        const data = {
            "role_id": store.getState().login.roleId,
        }
        dispatch({
            type:actionCreators.ENTRANT_LIST_CHECK,
        });

        new Promise(function(resolve,reject){


            Axios.post(base_url+"",data,{ headers: getHeaders()})
            .then(response=>{
                resolve(response);
                dispatch({
                    type:actionCreators.ENTRANT_LIST_SUCCESS,
                    payload:response.data.data
                }) 
            })
            .catch(err=>{
                reject(err);
                dispatch({
                    type:actionCreators.ENTRANT_LIST_FAIL,
                    payload:err
                })
            });
        })
    }
}
    
//Entrant List end
