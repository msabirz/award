import Axios from "axios";
import {base_url,test_base_url} from '../Config/AppConfig';
import { getHeaders } from "./headers";

// 93fc81b03d3173dcbe38398fdafefce1e2eb6a5a


export function getCall(){
  Axios.create({
    baseURL: base_url,
    timeout: 5000,
    headers: {"Authorization":getHeaders()}
  });
};


// const response = await getCall.post('/data',{});
// response.status
// response.data.data





// export function postCall(url, data) {
//   new Promise(function(resolve,reject){
//     Axios.post(test_base_url+url+"?token=93fc81b03d3173dcbe38398fdafefce1e2eb6a5a", data,{headers:getHeaders()})
//     .then(response=>{
//       resolve(response);
//       return response;
//     })
//     .catch(err=>{
//       reject(err);
//       return err;
//     })
//   })
// };

// export async function getAsyncCall(url) {
//   try {
//     const response = await Axios.get( base_url+url);
//     //console.log(response);
//     return response;
//   } catch (error) {
//     //console.error(error);
//     return error;
//   }
// };

// export async function postAsyncCall(url,data) {
//   try {
//     const response = await Axios.post( base_url+url,data);
//     //console.log(response);
//     return response;
//   } catch (error) {
//     //console.error(error);
//     return error;
//   }
// }

