import Base from "../components/Base";
import userContext from "../context/userContext";
const About = () =>{
    return (
        <userContext.Consumer>
            {
                (user) =>(
                    <Base>
                        <h1>This is about page</h1>
                        <p>we are building Blog application</p>
                        <h1>Welcome User: {user.name}</h1>
                    </Base>
                )
            }
        </userContext.Consumer>
    )
};
export default About;