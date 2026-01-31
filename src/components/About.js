import { useEffect, useState, useMemo } from "react";
import UserClass from "./UserClass";
import Dummy from "./Dummy";
import UserContext from "../utils/UserContext";

const About = () => {
    const [user, setUser] = useState({name: "neha"});
    // const fn = {n: 1}; // this is always a new obj. causes Dummy to re-render irrespective of React.Memo()

    const fn = useMemo(() => ({n:2}), []);
    const str = "hello"

    useEffect(() => {
        console.log("about useeffect")
        // setUser(user => user); // this way we pass same reference. hence, about not re-rendered again.

        // setUser({name: "sal"}); // new ref, will re-render about component.
        setUser({...user}); // creates shallow copy -> new ref, will re-render about component.
    }, []);

    return(
        <div>
            {console.log("about rendered")}
            <h1> About </h1>
            <h2> this is about section</h2>
            <UserContext.Consumer>
                {({loggedInUser}) => <h1>{loggedInUser}</h1>}
            </UserContext.Consumer>
            <UserClass index = {"1"} />
            <UserClass index = {"2"}/>
            <Dummy f={fn}/>
        </div>
    )       
}

export default About;