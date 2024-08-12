import { myAxios } from "./helper";

export const signUp =(user) =>{
    return myAxios
    .post("/auth/register",user)
    .then((response)=>response.data)
};
export const loginUser = (loginDetail) =>{
    return myAxios
    .post("/auth/login",loginDetail)
    .then((response)=>response.data)
}


//http://localhost:8083/api/v1/users/2
export const getUser = (userId) =>{
    return myAxios
    .get(`/users/${userId}`)
    .then((response)=>response.data)
}