import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
// const Home = () =>{
//     return (
//         <Base>
//         <Container >
//         <NewFeed></NewFeed>
//         </Container>
//         </Base>
//     );
// };

function Post({post={title:"This is default Post Titile",content:"This is default post content"}}){
    return (
       <Card className="border-0 shadow-sm  mt-2">
        <CardBody>
            <h1>{post.title}</h1>
            <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,20)+"..."}}>
            </CardText>
            <Link className="btn btn-secondary" to={"/posts/"+post.postId}>Read more</Link>
        </CardBody>
       </Card>
    )
}

export default Post