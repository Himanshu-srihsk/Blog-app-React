import React, { useEffect, useState } from "react"
import  Base from "../../components/Base"
import AddPost from "../../components/AddPost"
import { Container } from "reactstrap"
import { getCurrentUserDetail } from "../../auth";
import { loadPostUserWise } from "../../services/post-service";
import { toast } from "react-toastify";
import Post from "../../components/Post";
const Userdashboard = () =>{
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    console.log(getCurrentUserDetail())
    setUser(getCurrentUserDetail())
    loadPostUserWise(getCurrentUserDetail().id).then(data=>{
      console.log(data)
      setPosts([...data])
    }).catch(error=>{
      console.log(error);
      toast.error("Error while loading post User wise")
    })
  },[])
    return (
      

        <Base>
        <div className ="container">
          <AddPost/>
          <h1 className="my-3">Posts count: {posts.length}</h1>
          {
            posts.map((post,index)=>{
              return (
                <Post post={post} key={index}/>
              )
            })
          }
        </div>
        
        </Base>
         
    )
};

export default Userdashboard