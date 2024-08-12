import React, { useEffect, useState } from "react";
import userContext from "./userContext";
import { getCurrentUserDetail, isLoggedIn } from "../auth";
function UserProvider({children}){
    const [user,setUser] = useState({
        // name:'Himanshu'

        data:{},
        login:false
    })
    useEffect(()=>{
       setUser({
        // name:"Aditya"

        data: getCurrentUserDetail(),
        login: isLoggedIn()
       })
    },[])
    return(
        <userContext.Provider value={{user,setUser}}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider;