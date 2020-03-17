import * as actionCreators from '../actionTypes';

const initialState = {
   entryList:[],
   isLoading:false,
};
const entryReducer = (state = initialState, action) => {
    // event save 
    switch (action.type) {
        //entry list
        case actionCreators.ENTRY_LIST_CHECK:
          return {
          ...state,
          isLoading:true,
          };
        case actionCreators.ENTRY_LIST_SUCCESS:{
          return {
            ...state,
            entryList:action.payload,
            isLoading:false
          }
        }
        case actionCreators.ENTRY_LIST_FAIL:{
          return {
            ...state,
            isLoading:false,
          }
        }
        //entry list end
        default:
            return { ...state };
        }
      };
      export default entryReducer;