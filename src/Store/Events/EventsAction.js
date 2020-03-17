import * as actionCreators from '../actionTypes';
import Axios from "axios";
import { base_url } from "../../Config/AppConfig";
import history from '../history';
import { getHeaders } from '../Common/Common';

 // email_unique_flag

// Event Add
export const _saveEvent =(data)=>{
      return dispatch =>{
        const eventData = {
                        "name":data.eventName,
                        "startDate":data.selectedStartDate,
                        "endDate":data.selectedEndDate,
                        "submissionDeadline":data.selectedSubmissionDate,
                        "timezone":data.timezone,
                        // "logo":data.logoName.fileList[0].response.data,
                        "logo":data.fileList[0],
                        "status":data.eventStatus,
                        "description":data.description,
                        "mainContactEmail":data.mailContactEmail,
                        "otherContactEmail":data.otherContactEmail === undefined ? null:data.otherContactEmail,
                        "mailSignature":data.mailSignature,
                        "outgoingMailSender":data.outgoingMail,
                        "replyToEmail":data.replyToEmail,
                    }

        new Promise(function(resolve,reject){

            dispatch({
                type:actionCreators.EVENT_SAVE_CHECK,
              });

          Axios.post(base_url+"event/store",eventData,{headers:getHeaders()})
          .then(response=>{
            resolve(response);
            if(response.data.status_code === 1000)
            {
                 dispatch({
                     type:actionCreators.EVENT_SAVE_SUCCESS,
                     payload:response.data
                    });  
                 return history.push('/Home/Events');
                }
          })
          .catch(err=>{
            reject(err);
            return dispatch({
                type:actionCreators.EVENT_SAVE_FAIL,
                payload:err
            });
          })
        })
      }
    }
// Event Add end

//event show action
export const _showEvent =(seo_keyword,id)=>{
    const data={
        "event_seokeyword":seo_keyword,
        "id":id,
    }
    return dispatch =>{
        dispatch({
            type:actionCreators.EVENT_SHOW_CHECK,
        });

        new Promise(function(resolve,reject){

            Axios.post(base_url+'event/edit/',data,{ headers: getHeaders()})
            .then(response=>{
                resolve(response);
                dispatch({
                    type:actionCreators.EVENT_SHOW_SUCCESS,
                    payload:response.data.data
                });
            })
            .catch(err=>{
                reject(err);
                dispatch({
                    type:actionCreators.EVENT_SHOW_FAIL,
                    payload:err
                })
            });
        })
    }
}

//event show action end

// event update store
export const _updateEvent =(data)=>{
    return dispatch =>{
      const eventData = {
        "id":data.id,
        "name":data.eventName,
        "startDate":data.selectedStartDate,
        "endDate":data.selectedEndDate,
        "submissionDeadline":data.selectedSubmissionDate,
        "timezone":data.timezone,
        // "logo":data.logoName === undefined ?getState().events.singleEvent.logo:data.logoName.fileList[0].response.data,
        "logo":"test.png",
        "status":data.eventStatus,
        "description":data.description,
        "mainContactEmail":data.mailContactEmail,
        "otherContactEmail":data.otherContactEmail === undefined ? null:data.otherContactEmail,
        "mailSignature":data.mailSignature,
        "outgoingMailSender":data.outgoingMail,
        "replyToEmail":data.replyToEmail,
        }

      new Promise(function(resolve,reject){

          dispatch({
              type:actionCreators.UPDATEEVENT_SAVE_CHECK,
            });

        Axios.post(base_url+"event/update",eventData,{headers:getHeaders()})
        .then(response=>{
          resolve(response);
          if(response.data.status_code === 1000){
            dispatch({
                type:actionCreators.UPDATEEVENT_SAVE_SUCCESS,
                payload:response.data
            });  
                return history.push('/Home/Events');
            }
        })
        .catch(err=>{
          reject(err);
          return dispatch({
              type:actionCreators.UPDATEEVENT_SAVE_FAIL,
              payload:err
          });
        })
      })
    }
  }

// event update store

// event List Action
export const _eventList =()=>{
    return dispatch =>{
        dispatch({
            type:actionCreators.EVENT_LIST_CHECK,
        });

        new Promise(function(resolve,reject){


            Axios.post(base_url+'event/list',{},{ headers: getHeaders()})
            .then(response=>{
                resolve(response);
                dispatch({
                    type:actionCreators.EVENT_LIST_SUCCESS,
                    payload:response.data.data
                }) 
            })
            .catch(err=>{
                reject(err);
                dispatch({
                    type:actionCreators.EVENT_LIST_FAIL,
                    payload:err
                })
            });
        })
    }
}
    
//event List Action end

// Entry List
export const _entryList =()=>{
    return dispatch =>{
        dispatch({
            type:actionCreators.ENTRY_LIST_CHECK,
        });

        new Promise(function(resolve,reject){


            Axios.post(base_url+'/EntryList',{},{ headers: getHeaders()})
            .then(response=>{
                resolve(response);
                dispatch({
                    type:actionCreators.ENTRY_LIST_SUCCESS,
                    payload:response.data.data
                }) 
            })
            .catch(err=>{
                reject(err);
                dispatch({
                    type:actionCreators.ENTRY_LIST_FAIL,
                    payload:err
                })
            });
        })
    }
}
    
//Entry List end

// event delete

export const _deleteEvent =(id)=>{
    return dispatch =>{
        dispatch({
            type:actionCreators.EVENT_DELETE_CHECK,
        });
        const data={
            "id":id
        }

        new Promise(function(resolve,reject){
            Axios.post(base_url+'event/delete/',data,{ headers: getHeaders()})
            .then(response=>{
                resolve(response);
                dispatch({
                    type:actionCreators.EVENT_DELETE_SUCCESS,
                    payload:response.data
                }) 
                return dispatch(_eventList());
            })
            .catch(err=>{
                reject(err);
                dispatch({
                    type:actionCreators.EVENT_DELETE_FAIL,
                    payload:err
                })
            });
        })
    }
}

// event delete end

//Latest event List Action
export const _latestEventList =()=>{
    return dispatch =>{
        dispatch({
            type:actionCreators.LATESTEVENT_LIST_CHECK,
        });

        new Promise(function(resolve,reject){

            Axios.post(base_url+'event/latest_events',{},{ headers: getHeaders()})
            .then(response=>{
                resolve(response);
                dispatch({
                    type:actionCreators.LATESTEVENT_LIST_SUCCESS,
                    payload:response.data.data.latest_events
                }) 
            })
            .catch(err=>{
                reject(err);
                dispatch({
                    type:actionCreators.LATESTEVENT_LIST_FAIL,
                    payload:err
                })
            });
        })
    }
}
//Latest event List Action end

//event Details action
export const _eventDetail =(seo)=>{
    const data={
        "event_seokeyword":seo
    }
    return dispatch =>{
        dispatch({
            type:actionCreators.EVENT_DETAIL_CHECK,
        });

        new Promise(function(resolve,reject){

            Axios.post(base_url+'event/show',data,{ headers: getHeaders()})
            .then(response=>{
                console.log("reps",response.data.data)
                resolve(response);
                dispatch({
                    type:actionCreators.EVENT_DETAIL_SUCCESS,
                    payload:response.data.data
                });
            })
            .catch(err=>{
                reject(err);
                dispatch({
                    type:actionCreators.EVENT_DETAIL_FAIL,
                    payload:err
                })
            });
        })
    }
}

//event detail action end
    

export function unmountDeleteEvent(){
    return dispatch=>{
        return dispatch({type:actionCreators.CLEAR_MSG})
    }
}