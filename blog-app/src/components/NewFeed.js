import { useEffect, useState } from "react";
import { loadAllPosts } from "../services/post-service";
import Base from "./Base";
import { Row, Col, Pagination, PaginationItem, PaginationLink, Container} from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";
const NewFeed = ()=>{

    const [postContent,setPostContent] = useState({
        content:[],
        totalPages:"",
        totalElements:'',
        pageSize:'',
        lastPage:false,
        pageNumber:''
    });
    useEffect(()=>{
        //laod all the posts from the server
        changePage(0)
        // loadAllPosts(0,5).then((data)=>{
        //    console.log(data);
        //     setPostContent(data)
        //     window.scroll(0,0)
        // }).catch(error=>{
        //     toast.error("Error in loading posts")
        // })

    },[]);

    const changePage = (pageNumber=0,pageSize=5) =>{
        if(pageNumber > postContent.pageNumber && postContent.lastPage){
            return;
        }
        if(pageNumber < postContent.pageNumber && postContent.pageNumber==0){
            return;
        }
        loadAllPosts(pageNumber,pageSize).then(data=>{
            console.log(data);
            setPostContent(data)
        }).catch(error=>{
           toast.error("Error in loading posts")
        })
    }

    return(
       <div className="container-fluid">
          <Row>
          <Col md={
              {  size: 10,
                offset:1}
            }>
                <h1>Blogs counts ({postContent?.totalElements})</h1>
                {
                    postContent.content.map((post) => (
                        <Post post={post} key={post.postId} />
                    ))
                    
                }
                <Container className='text-center mt-4'>
                    <Pagination size='lg'>
                        <PaginationItem 
                        onClick={()=> changePage(postContent.pageNumber-1)}
                        disabled={postContent.pageNumber==0}>
                            <PaginationLink>previous
                            </PaginationLink>
                        </PaginationItem>
                        {
                            [...Array(postContent.totalPages)].map((item,index)=>(
                                <PaginationItem onClick={()=> changePage(index)} active={postContent.pageNumber === index} key={index}>
                                    <PaginationLink>
                                    {index+1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))
                        }
                        <PaginationItem onClick={()=> changePage(postContent.pageNumber+1)} disabled={postContent.lastPage}>
                            <PaginationLink>next
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>
                </Container>
                
            </Col>
          </Row>
       </div>
    );
}

export default NewFeed