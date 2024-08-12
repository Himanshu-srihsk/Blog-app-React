import Base from "../components/Base";
import userContext from "../context/userContext";
const About = () =>{
    return (
        <userContext.Consumer>
            {
                (Object) =>(
                    <Base>
                        <h1>This is about page</h1>
                        <p>we are building Blog application</p>
                        {console.log(Object)}
                        <h1>Welcome User: {Object.user.login && Object.user.data.name}</h1>
                    </Base>
                )
            }
        </userContext.Consumer>
    )
};
export default About;