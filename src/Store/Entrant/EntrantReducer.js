import * as actionCreators from '../actionTypes';

const initialState = {
   entrantList:[],
   isLoading:false,
};
const entrantReducer = (state = initialState, action) => {
    // event save 
    switch (action.type) {
        //entry list
        case actionCreators.ENTRANT_LIST_CHECK:
          return {
          ...state,
          isLoading:true,
          };
        case actionCreators.ENTRANT_LIST_SUCCESS:{
          return {
            ...state,
            entrantList:action.payload,
            isLoading:false
          }
        }
        case actionCreators.ENTRANT_LIST_FAIL:{
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
      export default entrantReducer;