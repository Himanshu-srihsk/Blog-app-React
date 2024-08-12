import React, { useContext, useEffect, useRef, useState } from 'react'
import Base from '../components/Base'
import { useNavigate, useParams } from 'react-router-dom'
import { loadSinglePost,updatePost as doUpdatePost } from '../services/post-service'
import { toast } from 'react-toastify'
import userContext from '../context/userContext'
import { loadAllCategories } from '../services/category-service'
import { Button, Card, CardBody, Container, Form, Input, Label, Toast } from "reactstrap";
import JoditEditor from 'jodit-react';

function UpdateBlog() {
  const [categories,setCategories] = useState([])
  const {blogId} = useParams()
  const editor = useRef(null);
  const object = useContext(userContext)
  const navigate = useNavigate()

  const [post,setPost] = useState(null)

  useEffect(()=>{
    //load tne  categories

    loadAllCategories().then((data) => {
      console.log(data)
      setCategories(data)
  }).catch(error => {
      console.log(error)
  })

     // load the blog from DB
     loadSinglePost(blogId).then((data)=>{
      console.log("blogId",blogId)
      console.log("data",data)
        setPost({...data,categoryId:data.category.categoryId})
     }).catch(error=>{
      console.log(error)
      toast.error("Error while loading blog for update")
     })
  },[])

  useEffect(()=>{
    console.log("post is",post)
    if(post){
      if(post.user.id!=object.user.data.id){
        toast.error("Not your post")
        navigate("/")
      }
    }
  },[post])

  const handleChange = (event,fieldName)=>{
      setPost(
        {
          ...post,
          [fieldName]:event.target.value
        }
      )
  }

  const updatePost = (event) =>{
    event.preventDefault()
    console.log(post)
    doUpdatePost({...post,category:{ categoryId: post.categoryId}}, post.postId).then((response)=>{
      console.log(response)
        toast.success("update success")
    }).catch((error)=>{
      console.log(error)
      toast.error("update Error")
    })
  }

  const updateHtml = () =>{
    return(
      
      <div className="wrapper">
         {/* {JSON.stringify(post)} */}
        <Card className="shadow-sm border-0 mt-3">
            <CardBody>
               

                <h3>Update post from here</h3>
                <Form onSubmit={updatePost}>
                    <div className="my-3">
                        <label htmlFor="title"> Post title</label>
                        <Input type="text" id="title" placeholder="enter here" className="rounder-0" name="title"
                        value={post.title}
                        onChange={(event) => handleChange(event, 'title')}
                        />
                        
                    </div>


                    <div className="my-3">
                        <label htmlFor="content"> Post content</label>
                        {/* <Input type="textarea" id="content" placeholder="enter here" className="rounder-0" style={{height:'300px'}}/> */}
                        <JoditEditor
                            ref={editor}
                            value={post.content}
                            onChange={(newContent)=>setPost({...post,content:newContent})}
                            />
                    </div>
                    {/* fILE Input */}
                    <div className="mt-3">
                        <Label for="image">Select Post Image</Label>
                        <Input type="file" id = "image" multiple/>
                    </div>

                    <div className="my-3">
                        <label htmlFor="category"> Post Category</label>
                        <Input type="select" id="category" placeholder="enter here" className="rounder-0" name="categoryId"
                         onChange={(event)=>handleChange(event,'categoryId')}
                        //  defaultValue={0}
                        // value={post.category.categoryId}>
                        value={post.categoryId  || ''}>
                        <option disabled value={0}> --select category--</option>
                        {
                            categories.map((category)=>(
                                <option value={category.categoryId} key={category.categoryId}>
                                    {category.categoryTitle}
                                </option>
                            ))
                        }
                        </Input>
                    </div>

                    <Container className="text-center">
                        <Button type="submit" color="primary"className="rounder-0" >Update Post</Button>
                        <Button color="danger"className="rounder-0 ms-2" >Reset Content</Button>
                    </Container>

                </Form>
            </CardBody>
        </Card>
        </div>
    )
  }
  return (
    <Base>
        <Container>
        {post && updateHtml()}
        </Container>
    </Base>
  )
}

export default UpdateBlog