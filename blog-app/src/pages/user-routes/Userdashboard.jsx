import React, { useEffect, useState } from "react"
import  Base from "../../components/Base"
import AddPost from "../../components/AddPost"
import { Container } from "reactstrap"
import { getCurrentUserDetail } from "../../auth";
import { deletePostService, loadPostUserWise } from "../../services/post-service";
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
  
  function loadPostData(){
    loadPostUserWise(getCurrentUserDetail().id).then(data=>{
      console.log(data)
      setPosts([...data])
    }).catch(error=>{
      console.log(error);
      toast.error("Error while loading post User wise")
    })
  }
  function deletePost(post){
    deletePostService(post.postId).then(res=>{
      console.log(res)
      toast.success("post is Deleted")
      //loadPostData()

      let newPosts = posts.filter(p => p.postId != post.postId)
      setPosts([...newPosts])

    }).catch(error=>{
      console.log(error)
      toast.error("Error while deleting post")
    })
  }
    return (
      

        <Base>
        <div className ="container">
          <AddPost/>
          <h1 className="my-3">Posts count:  ({posts.length})</h1>
          {
            posts.map((post,index)=>{
              return (
                <Post post={post} key={index} deletePost={deletePost}/>
              )
            })

          }
        </div>
        
        </Base>
         
    )
};

export default Userdashboard