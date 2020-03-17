
// export const clientList = ()=>{
    
//    return dispatch=>{
//     dispatch({type:actionCreators.CLIENT_LIST_CHECK});

//     const data ={
//         "client_id":store.getState().login.user.client_id,
//         "role_id":store.getState().login.user.role_id
//     }
//     Axios.post(base_url+'clients',data,{headers:getHeaders()}).then(
//         response=>{
//             console.log("RESP ",response);
//             if(response.data.success === true){
//                 return dispatch({
//                     type:actionCreators.CLIENT_LIST_SUCCESS,
//                     payload:response.data.data.clients
//                 })
//             }else{
//                 return dispatch({
//                     type:actionCreators.CLIENT_LIST_FAIL,
//                     payload:'REPONSE ERROR'
//                 })
//             }
//         }
//         ).catch(
//             error=> dispatch({type:actionCreators.CLIENT_LIST_FAIL,payload:error})
//         )
//    }
// }

