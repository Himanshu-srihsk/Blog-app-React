//is LoggedIn
export const isLoggedIn = () =>{
    let data = localStorage.getItem("data");
    return data==null?false:true;
}

//do Login
export const doLogin = (data,next) =>{
    localStorage.setItem("data",JSON.stringify(data));
    next();
}


//do logout
export const doLogout = (next)=>{
    localStorage.removeItem("data");
    next();
}
//get current user

export const getCurrentUserDetail = () =>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data"))?.user;
    }else{
        return undefined;
    }
}

export const getToken = () =>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data"))?.jwtToken;
    }else{
        return undefined;
    }
}