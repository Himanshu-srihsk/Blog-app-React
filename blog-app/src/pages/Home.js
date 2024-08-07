import { useEffect } from "react";
import Base from "../components/Base";
import NewFeed from "../components/NewFeed"
import { Col, Container, Row } from "reactstrap";
import CategorySideMenu from  "../components/CategorySideMenu"
const Home = () =>{
    return (
        <Base>
        {/* <Container >
        <NewFeed></NewFeed>
        </Container> */}

        <Container className="mt-3">
            <Row>
                <Col md={2} className="pt-5">
                <CategorySideMenu/>
                </Col>
                <Col md={10}>
                <NewFeed/>
                </Col>
            </Row>
        </Container>
        </Base>
    );
};

export default Home