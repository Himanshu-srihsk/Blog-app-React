import userContext from "../context/userContext";
import Base from "../components/Base";

const Services = ()=>{
    return(
        <userContext.Consumer>
            {
                (user) => (
                    <Base>
                    <h1>
                        This is services pages
                    </h1>
                    <h1>Welcome user:{user.user.data.name}</h1>
                    </Base>
                )
            }
        </userContext.Consumer>
    );
}

export default Services;