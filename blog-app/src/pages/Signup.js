import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";

const Signup = () =>{
    return (
       <Base>
          <Container>
            <Row className="mt-4">
                <Col sm={{size:6,offset:3}}>
                    <Card color="dark" inverse>
                        <CardHeader>
                            <h3>Fill imformation to register</h3>
                        </CardHeader>

                        <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="name"> Enter Name </Label>
                                    <Input type="text" id="name" placeholder="Enter here"  />
                            </FormGroup>

                            <FormGroup>
                                <Label for="email"> Enter Email </Label>
                                    <Input type="email" id="email" placeholder="Enter here"  />
                            </FormGroup>

                            <FormGroup>
                                <Label for="password"> Enter Password </Label>
                                    <Input type="password" id="password" placeholder="Enter here"  />
                            </FormGroup>

                            <FormGroup>
                                <Label for="about"> Enter about  you </Label>
                                    <Input type="textarea" id="about" placeholder="Enter here"  style={{height:"200px"}} />
                            </FormGroup>

                        </Form>
                        <Container className="text-center">
                            <Button outline  color="light">Register</Button>
                            <Button color="secondary" type="reset"className="ms-2">Reset</Button>
                        </Container>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
          </Container>
       </Base>
    );
};


export default Signup