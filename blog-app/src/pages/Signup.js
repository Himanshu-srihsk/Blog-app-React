import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import { signUp } from "../services/user-service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () =>{
    const [data, setData] = useState({
          name:'',
          email:'',
          password:'',
          about:'',
    })
    

    const [error, setError] = useState({
        errors:{},
        isError:false,
    })

    //handleChange

    useEffect(()=>{
        //console.log(data);
    },[data])

    const handleChange =(event,property) =>{
            //  console.log("name fiedl chnaged")
            //  console.log(event.target.value)
            //dynamically setting values
            setData({...data,[property]:event.target.value});
    }
   
    //reset form
    const resetData =() =>{
        setData(
            {
            name:'',
            email:'',
            password:'',
            about:'',
            }
        );
    }

    const validateFormData = () => {
        const errors = {};
        let isError = false;
    
        if (!data.name.trim()) {
            errors.name = "Name is required";
            isError = true;
        }
    
        if (!data.email.trim()) {
            errors.email = "Email is required";
            isError = true;
        }
    
        if (!data.password.trim()) {
            errors.password = "Password is required";
            isError = true;
        }
    
        if (!data.about.trim()) {
            errors.about = "About section is required";
            isError = true;
        }
    
        setError({ errors, isError });
        return isError;
    };

    //submit form

    const submitForm = (event) =>{
           event.preventDefault();
           console.log(data);
           
        //    if(error.isError){
        //     toast.error("Form data is Invalid, correct all details and then Submit");
        //     setError({...error,isError:false})
        //      return;
        //    }

        if (validateFormData()) {
            toast.error("Form data is Invalid, correct all details and then Submit");
            return;
        }

           //data validate

           //call server api for sending data
           signUp(data).then((resp)=>{
            console.log(resp);
            console.log("success log");
           toast.success("User is Registered successfully with user Id:"+ resp.id);
            // setData(
            // {
            // name:'',
            // email:'',
            // password:'',
            // about:'',
            // })
            resetData();
            
           }).catch((error)=>{
            console.log(error);
            console.log("error log");
            // setError({
            //     errors:error,
            //     isError:true
            // })

            setError({
                errors: error.response?.data || {},
                isError: true,
            });
           });

    }

    return (
       <Base>
          <Container>
            <Row className="mt-4">
                {/* {JSON.stringify({data})} */}
                <Col sm={{size:6,offset:3}}>
                    <Card color="dark" inverse>
                        <CardHeader>
                            <h3>Fill information to register</h3>
                        </CardHeader>

                        <CardBody>
                        <Form  onSubmit={submitForm}>
                            <FormGroup>
                                <Label for="name"> Enter Name </Label>
                                    <Input type="text" id="name" placeholder="Enter here" onChange={(e)=>handleChange(e,'name')}  value={data.name}
                                     invalid={error.errors.name ? true : false}
                                     />
                                     <FormFeedback>{error.errors.name}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="email"> Enter Email </Label>
                                    <Input type="email" id="email" placeholder="Enter here" onChange={(e)=>handleChange(e,'email')}  value={data.email}
                                    //  invalid={error.errors?.response?.data?.name?true:false}/>
                                    invalid={error.errors.email ? true : false}
                                    />
                                    <FormFeedback>{error.errors.email}</FormFeedback>
                                    
                            </FormGroup>

                            <FormGroup>
                                <Label for="password"> Enter Password </Label>
                                    <Input type="password" id="password" placeholder="Enter here"  onChange={(e)=>handleChange(e,'password')}  value={data.password}
                                    //  invalid={error.errors?.response?.data?.name?true:false}/>
                                    invalid={error.errors.password ? true : false}
                                    />
                                     <FormFeedback>{error.errors.password}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="about"> Enter about  you </Label>
                                    <Input type="textarea" id="about" placeholder="Enter here"  style={{height:"200px"}} onChange={(e)=>handleChange(e,'about')}  value={data.about}
                                    //  invalid={error.errors?.response?.data?.name?true:false}/>
                                    invalid={error.errors.about ? true : false}
                                    />

                                <FormFeedback>{error.errors.about}</FormFeedback>
                            </FormGroup>
                             
                            <Container className="text-center">
                                <Button  type="submit" outline  color="light">Register</Button>
                                <Button onClick={resetData} color="secondary" type="reset"className="ms-2">Reset</Button>
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


export default Signup