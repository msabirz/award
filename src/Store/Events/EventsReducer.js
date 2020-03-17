import * as actionCreators from '../actionTypes';

const initialState = {
   responseDataSuccess:[],
   responseDataFail:null,
   latestEventList:[],
   eventList:[],
   entryList:[],
   singleEvent:[],
   singleEventFail:null,
   deleteEventMsg:null,
   isListLoading:false,
   isLoading:false,
   updateResponsedata:[],
   detailEvent:[],
   detailEventFail:false
};

const eventsReducer = (state = initialState, action) => {
  // event save 
  switch (action.type) {
    case actionCreators.EVENT_SAVE_CHECK:
      return {
       ...state,
       isLoading:true
      };

    case actionCreators.EVENT_SAVE_SUCCESS:
      return {
       ...state,
       responseDataSuccess:action.payload,
       isLoading:false
      };

    case actionCreators.EVENT_SAVE_FAIL:{
      return {
        ...state,
        responseDataFail:action.payload,
        isLoading:false
      }
    }
// event save end

//latest event list
    case actionCreators.LATESTEVENT_LIST_CHECK:
      return {
      ...state,
      isListLoading:true,
      };
    case actionCreators.LATESTEVENT_LIST_SUCCESS:{
      return {
        ...state,
        latestEventList:action.payload,
        isListLoading:false
      }
    }
    case actionCreators.LATESTEVENT_LIST_FAIL:{
      return {
        ...state,
        isListLoading:false,
      }
    }
//latest event list end

//event list
case actionCreators.EVENT_LIST_CHECK:
  return {
  ...state,
  isListLoading:true,
  };
case actionCreators.EVENT_LIST_SUCCESS:{
  return {
    ...state,
    eventList:action.payload,
    isListLoading:false
  }
}
case actionCreators.EVENT_LIST_FAIL:{
  return {
    ...state,
    isListLoading:false,
  }
}
//event list end



// event show
case actionCreators.EVENT_SHOW_CHECK:{
  return{
    ...state,
    isLoading:true
  }
}
    case actionCreators.EVENT_SHOW_SUCCESS:{
      return{
        ...state,
        singleEvent:action.payload,
        isLoading:false
      }
    }
    case actionCreators.EVENT_SHOW_FAIL:{
      return{
        ...state,
        singleEventFail:action.payload,
        isLoading:false
      }
    } 
// event show end

// event detail
case actionCreators.EVENT_DETAIL_CHECK:{
  return{
    ...state,
    isLoading:true
  }
}
    case actionCreators.EVENT_DETAIL_SUCCESS:{
      return{
        ...state,
        detailEvent:action.payload,
        isLoading:false
      }
    }
    case actionCreators.EVENT_DETAIL_FAIL:{
      return{
        ...state,
        detailEventFail:action.payload,
        isLoading:false
      }
    } 
// event detail end

// event delete
    case actionCreators.EVENT_DELETE_CHECK:
      return {
      ...state,
      isListLoading:true,
      };
    case actionCreators.EVENT_DELETE_SUCCESS:{
      return{
        ...state,
        deleteEventMsg:action.payload.message
      }
    }

    case actionCreators.EVENT_DELETE_FAIL:{
      return{
        ...state,
        deleteEventMsg:action.payload
      }
    }
//event delete end

//clr msg
    case actionCreators.CLEAR_MSG:{
      return{
        ...state,
        deleteEventMsg:null
      }
    }
//clr msg end


// event update reducer
  case actionCreators.UPDATEEVENT_SAVE_CHECK:
    return {
     ...state,
     isLoading:true
    };

  case actionCreators.UPDATEEVENT_SAVE_SUCCESS:
    return {
     ...state,
     updateResponsedata:action.payload,
     isLoading:false
    };

  case actionCreators.UPDATEEVENT_SAVE_FAIL:{
    return {
      ...state,
      responseDataFail:action.payload,
      isLoading:false
    }
  }
// event update reducer

    default:
      return { ...state };
  }
};
export default eventsReducer;