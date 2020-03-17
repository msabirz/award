import * as actionCreators from '../actionTypes';

const initialState = {
    addField:null,
    addFieldError:null,
    showModal:false,
    formObject:[],
};

const EntryFormReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case actionCreators.EVENT_FORM_ADD_FIELD_SUCCESS:{
        return{
            ...state,
            addField:action.payload,
            showModal:true
        }
    }

    case actionCreators.HIDE_MODAL:{
        return {
            ...state,
            showModal:false
        }
    }
    case actionCreators.ADD_MAIN_FORM:{
        return{
            ...state,
            showModal:false,
            formObject:state.formObject.concat(action.payload)
        }
    }

    case actionCreators.EVENT_FORM_ADD_FIELD_FAIL:{
        return{
            ...state,
            addFieldError:action.payload
        }
    }

    default:
      return { ...state };
  }
};
export default EntryFormReducer;