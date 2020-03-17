import * as actionCreators from '../actionTypes';

export function addFormField(data){
    return dispatch=>{
        try {
            return dispatch({type:actionCreators.EVENT_FORM_ADD_FIELD_SUCCESS,payload:data})
        } catch (error) {
            return dispatch({type:actionCreators.EVENT_FORM_ADD_FIELD_SUCCESS,payload:'Error while Adding'})
        } 
    }
}

export function handleCancel(){
     return dispatch=>{
         return dispatch({type:actionCreators.HIDE_MODAL})
     }
}

export function handleOk(){
    return dispatch=>{
        return dispatch({type:actionCreators.HIDE_MODAL})
    }
}

export function addMainForm(data){
    return dispatch =>{
        return dispatch({type:actionCreators.ADD_MAIN_FORM,payload:data})
    }
}
