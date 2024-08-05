import { Link, useParams } from "react-router-dom";
import Base from "../components/Base";
import { Button, Card, CardBody, CardText, Col, Container, Row, Input, FormGroup, Form } from "reactstrap";
import { useEffect, useState } from "react";
import { createComment, loadSinglePost } from "../services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import { isLoggedIn } from "../auth";

const PostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState({
        content: ''
    });

    const printDate = (numbers) => {
        return new Date(numbers).toLocaleString();
    };

    useEffect(() => {
        loadSinglePost(postId).then(data => {
            console.log(data);
            setPost(data);
        }).catch(error => {
            console.log(error);
            toast.error("Error in loading post");
        });
    }, [postId]);

    const submitComment = () => {
        if (!isLoggedIn()) {
            toast.error("Login First");
            return;
        }
        if (comment.content.trim() === '') {
            toast.error("Comment cannot be empty");
            return;
        }
        createComment(comment, post.postId)
            .then(data => {
                console.log(data);
                toast.success("Comment added");
                setPost({
                    ...post,
                    comments: [...post.comments, data.data]
                });
                setComment({
                    content: ''
                });
            }).catch(error => {
                console.log(error);
                toast.error("Error in submitting comment");
            });
    };

    return (
        <Base>
            <Container>
                <Link to="/">Home</Link> / {post && (<Link to="#">{post.title}</Link>)}
                <div className="container-fluid">
                    <Row className="justify-content-center">
                        <Col className="mx-auto" md={{ size: 10 }}>
                            <Card className="mt-3 ps-2">
                                {post && (
                                    <CardBody>
                                        <CardText>
                                            Posted by <b>{post.user.name}</b> on <b>{printDate(post.addedDate)}</b>
                                        </CardText>
                                        <CardText>
                                            <span className="text-muted">{post.category.categoryTitle}</span>
                                        </CardText>
                                        <div className="divider" style={{ width: '100%', height: '1px', background: '#e2e2e2' }}></div>
                                        <h3>{post.title}</h3>
                                        <div className="image-container mt-4 shadow" style={{ maxWidth: '30%' }}>
                                            <img className="img-fluid" src={`${BASE_URL}/posts/image/${post.imageName}`} alt="" />
                                        </div>
                                        <CardText className="mt-3" dangerouslySetInnerHTML={{ __html: post.content }}></CardText>
                                    </CardBody>
                                )}
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ size: 9, offset: 1 }}>
                            <h3> Comments ({post && post.comments ? post.comments.length : 0})</h3>
                            {post && post.comments && post.comments.map((c, index) => (
                                <Card className="mt-2 border-0" key={index}>
                                    <CardBody>
                                        <CardText>
                                            {c.content}
                                        </CardText>
                                    </CardBody>
                                </Card>
                            ))}
                            <Card className="mt-4 border-0">
                                <CardBody>
                                    <Form onSubmit={e => {
                                        e.preventDefault();
                                        submitComment();
                                    }}>
                                        <FormGroup>
                                            <Input
                                                type="textarea"
                                                placeholder="Enter comment"
                                                value={comment.content}
                                                onChange={(event) => {
                                                    setComment({ content: event.target.value });
                                                }}
                                            />
                                        </FormGroup>
                                        <Button className="mt-2" color="primary" type="submit">Submit</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Base>
    );
};

export default PostPage;
