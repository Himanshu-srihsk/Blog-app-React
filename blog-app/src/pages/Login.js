import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";


const Login = () =>{
    const [loginDetail, setloginDetail] = useState({
        username:'',
        password:''
    });
    const handleChange = (event,field) =>{
      let actualValue = event.target.value;
      setloginDetail({
        ...loginDetail,
        [field]:actualValue
      })
    };
    const navigate = useNavigate();

  

    const handleFormSubmit =(event)=>{
        event.preventDefault();
        console.log(loginDetail);
        if(loginDetail.username=='' || loginDetail.password.trim()==''){
            toast.error("username or password is required");
            return;
        }

        //submit the data to server to generate JWT token
        loginUser(loginDetail).then((data)=>{
            
            console.log(data);

            doLogin(data,()=>{
                console.log("login detail saved to local storage");
                //Redirect to user dashboard
                navigate("/user/dashboard")
            })
            toast.success("Login Success");
        }).catch(error=>{
            console.log(error);
            if(error.response.status==400 || error.response.status==404){
                toast.error(error.response.data.message);
            }else{
                toast.error("something went wrong on server");
            }
           
        })
    };

    const handleReset = (event) =>{
        setloginDetail({
            username:"",
            password:"",
        })
    };



    return (
        <Base>
            <Container>
            <Row className="mt-4">
                 <Col sm={{size:6,offset:3}}>
                 <Card color="dark" inverse>
                        <CardHeader>
                            <h3> Login Here !! </h3>
                        </CardHeader>

                        <CardBody>
                        <Form onSubmit={handleFormSubmit}>
                           
                            <FormGroup>
                                <Label for="email"> Enter Email </Label>
                                    <Input type="email" id="email" placeholder="Enter here" value={loginDetail.username} onChange={(e)=> handleChange(e,'username')} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="password"> Enter Password </Label>
                                    <Input type="password" id="password" placeholder="Enter here"  value={loginDetail.password} onChange={(e)=> handleChange(e,'password')} />
                            </FormGroup>
                            <Container className="text-center">
                                <Button type="submit" outline  color="light">Login</Button>
                                <Button onClick={handleReset}  color="secondary" type="reset"className="ms-2">Reset</Button>
                            </Container>
                        </Form>
                        
                        </CardBody>
                    </Card>
                 </Col>
            </Row>     
            </Container>
        </Base>
    );
};


export default Login;