import { myAxios } from "./helper";

export const signUp =(user) =>{
    return myAxios
    .post("/auth/register",user)
    .then((response)=>response.data)
};