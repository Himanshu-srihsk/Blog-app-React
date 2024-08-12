import React, { useEffect, useState }  from "react";
import Base from "./Base";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import CategorySideMenu from  "../components/CategorySideMenu"
import NewFeed from "../components/NewFeed"
import { deletePostService, loadPostCategoryWise } from "../services/post-service";
import { toast } from "react-toastify";
import Post from "./Post";

function Categories(){
    const {categoryId} =useParams()
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        console.log(categoryId);
        loadPostCategoryWise(categoryId).then(data=>{
            setPosts([...data])
        }).catch((error)=>{
            console.log(error);
            toast.error("Error while loading post Category wise")
        })
    },[categoryId])

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
         <Container className="mt-3">
            <Row>
                <Col md={2} className="pt-5">
                <CategorySideMenu/>
                </Col>
                <Col md={10}>
                <h1>Blog Count ({posts.length})</h1>
                  {
                    posts && posts.map((post,index)=>{
                        return (
                            <Post deletePost={deletePost} key={index} post={post}/>
                        )
                    })
                  }
                  {
                   posts.length<=0?<h1>No Posts in the category</h1>: ''
                  }
                </Col>
            </Row>
        </Container>
       </Base>
    )
}

export default Categories