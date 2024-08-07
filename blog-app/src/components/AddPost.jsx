import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import { useEffect, useRef, useState } from "react";
import JoditEditor from 'jodit-react';
import { createPost  as doCreatePost, uploadPostImage} from "../services/post-service";
import { getCurrentUserDetail } from "../auth";
import { toast } from "react-toastify";

const AddPost = () =>{

    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [user, setUser] = useState(undefined);
    const [image, setImage] = useState(null);

    const config = {
        placeholder:"Start typing..."
    }
    const [post, setPost] = useState({
                                    title:'',
                                    content:'',
                                    categoryId:''
                                })

    const [categories,setCategories] = useState([])
    useEffect(()=>{
        setUser(getCurrentUserDetail())
       loadAllCategories().then((data)=>{
        //console.log(data)
        setCategories(data)
       }).catch(error =>{
        console.log(error)
       })
    }
    ,[])

    const fieldChanged = (event) =>{
       // console.log(event)
         // console.log(event.target.name)
        //  setPost({...post,'title':event.target.value})
        //need to make key dymamic sincefor title , category id same fn is called
         setPost({...post,[event.target.name]:event.target.value})
    }

    const contentFieldChanged = (data) =>{
        setPost({...post,'content':data})
    }

    const handleFileChange = (event)=>{
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }

    const createPost =(event)=>{
        event.preventDefault();
        if(post.title.trim() === ''){
            toast.error('post id is required')
            return;
        }
        if(post.content.trim() === ''){
            toast.error('post content is required')
            return;
        }
        if(post.categoryId.trim() === ''){
            toast.error('post categoryId is required')
            return;
        }

        //submit form on server
        post['userId']= user.id;
        doCreatePost(post).then(data=>{
            toast.success("Post Created")
           // console.log(post)
           uploadPostImage(image,data.postId).then(data=> {
            toast.success("Image Uploaded !!")
           }).catch(error=>{
            toast.error("error in uploading image")
            console.log(error)
            
           })
           setPost({
            title:'',
            content:'',
            categoryId:''
           })
        }).catch((error)=>{
            toast.error("Post failed due to some Error")
            ///console.log(error)
        })
    }

    return (
        <div className="wrapper">
        <Card className="shadow-sm border-0 mt-3">
            <CardBody>
                {/* {JSON.stringify(post)} */}
                <h3> What going in your mind?</h3>
                <Form onSubmit={createPost}>
                    <div className="my-3">
                        <label htmlFor="title"> Post title</label>
                        <Input type="text" id="title" placeholder="enter here" className="rounder-0" name="title" onChange={fieldChanged}/>
                    </div>


                    <div className="my-3">
                        <label htmlFor="content"> Post content</label>
                        {/* <Input type="textarea" id="content" placeholder="enter here" className="rounder-0" style={{height:'300px'}}/> */}
                        <JoditEditor
                            ref={editor}
                            value={post.content}
                        
                               onChange={contentFieldChanged}
                            />
                    </div>
                    {/* fILE Input */}
                    <div className="mt-3">
                        <Label for="image">Select Post Image</Label>
                        <Input type="file" id = "image" multiple onChange={handleFileChange}/>
                    </div>

                    <div className="my-3">
                        <label htmlFor="category"> Post Category</label>
                        <Input type="select" id="category" placeholder="enter here" className="rounder-0" name="categoryId" onChange={fieldChanged} defaultValue={0}>
                        <option disabled value={0}>--select category--</option>
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
                        <Button type="submit" color="primary"className="rounder-0" >Create Post</Button>
                        <Button color="danger"className="rounder-0 ms-2" >Reset Content</Button>
                    </Container>

                </Form>
            </CardBody>
        </Card>
        </div>
    )
}

export default AddPost;