export const getToken = () =>{
    const token = localStorage.getItem('token');
    // const token="93fc81b03d3173dcbe38398fdafefce1e2eb6a5a";
    return token;
}
export const getHeaders = () =>{
    return {'Authorization': 'Bearer'}
}
