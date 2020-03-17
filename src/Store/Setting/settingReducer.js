import * as actionCreators from '../actionTypes';

const initialState = {
   profileData:[],
   profileDataFail:null,
   isLoading:false,
   updateProfiledata:[]
};

const settingReducer = (state = initialState, action) => {

  switch (action.type) {

// profile show data
case actionCreators.PROFILE_SHOW_CHECK:{
  return{
    ...state,
    isLoading:true
  }
}
    case actionCreators.PROFILE_SHOW_SUCCESS:{
      return{
        ...state,
        profileData:action.payload,
        isLoading:false
      }
    }
    case actionCreators.PROFILE_SHOW_FAIL:{
      return{
        ...state,
        profileDataFail:action.payload,
        isLoading:false
      }
    } 
// profile show data end


// profile data update reducer
  case actionCreators.UPDATEPROFILE_SAVE_CHECK:
    return {
     ...state,
     isLoading:true
    };

  case actionCreators.UPDATEPROFILE_SAVE_SUCCESS:
    return {
     ...state,
     updateProfiledata:action.payload,
     isLoading:false
    };

  case actionCreators.UPDATEPROFILE_SAVE_FAIL:{
    return {
      ...state,
      profileDataFail:action.payload,
      isLoading:false
    }
  }
// profile data update reducer

    default:
      return { ...state };
  }
};
export default settingReducer;