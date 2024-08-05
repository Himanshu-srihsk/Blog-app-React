import React from "react";
import userContext from "./userContext";
function UserProvider({children}){
    const [user,setUser] = useState({
        name:''
    })
    return(
        <userContext.Provider>
            {childrenS}
        </userContext.Provider>
    )
}

export default UserProvider;