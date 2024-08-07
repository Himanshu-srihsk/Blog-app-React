import React, { useContext } from "react";
import Base from "../../components/Base"
import userContext from "../../context/userContext";
const ProfileInfo = () =>{
   const user = useContext(userContext)
   return (
      <Base>
         <div>ProfileInfo</div>
         <h1>Welcom {user.name}</h1>
      </Base>
    
   );
}
export default ProfileInfo;