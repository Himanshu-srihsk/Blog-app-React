import React, { useEffect, useState } from "react";
import userContext from "./userContext";
function UserProvider({children}){
    const [user,setUser] = useState({
        name:'Himanshu'
    })
    useEffect(()=>{
       setUser({
        name:"Aditya"
       })
    },[])
    return(
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider;