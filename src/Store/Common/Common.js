
export const getToken = () =>{
    const token = localStorage.getItem('token');
    return token;
}
export const getHeaders = () =>{
   return {'Authorization': 'Bearer '+ getToken()}
}

// export const userData =() =>{
//     return  {
//         "client_id":store.getState().login.user.client_id,
//         "role_id":store.getState().login.user.role_id
//     }
// } 