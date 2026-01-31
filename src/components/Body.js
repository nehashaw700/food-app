import RestaurantCard from "./RestaurantCard";
import restaurantListData from "../utils/mockData";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  // useState is a react hook or state variable which has the power of keeping the data layer in sync with the ui layer
  // dont create state var in conditions/ functions -> if, for, 
  const [listOfRes, setListOfRes] = useState([]);

  //it takes callback and dependency list as arg
  // called everytime comp render if no dep arr
  // if [], called once on the initial render
  // if [listOfRes], called everytime when listOfRes changes
  useEffect(() => {
    fetchData();
    
    console.log("UseEffect called")
    // called when unmounting the component
    return () =>{

    }
  }, []);

  const fetchData = () => {
    // const resData = await fetch(
    //   "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.40980&lng=77.31000&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    // );

    // sets the arg passed in listofres[]
    setListOfRes(restaurantListData); // expects an arr as a argument
  };

  const onlineStatus = useOnlineStatus();
  if(onlineStatus === false){
    return(
      <div>
      <h1>You are Offline!</h1>
      <h2>Please check your internet Connection!!!</h2>
      </div>
    )
  }

  const {loggedInUser, setUserName} = useContext(UserContext);

  return (
    <div className="body">
       <div className="search">
        <input className="search-input" 
        placeholder="Enter a restaurant"></input>
      </div>

      {/* <div>
        <input value = {loggedInUser} onChange={(e) => setUserName(e.target.value)}>
        </input>
      </div> */}

      <div className="res-container">
        {/* Restaurant -> Img, res name, star rating, delivery time */}

        {listOfRes.map((res) => {
          return (
            <Link key={res.info.id} to={"/restaurants/" + res.info.id} >

            <RestaurantCard
              resName={res?.info.name}
              cusines={res?.info.cuisines.join(', ')}
              time={res?.info.sla.deliveryTime}
              rating={res?.info.avgRating}
              image={res?.info.cloudinaryImageId}
            />

            {console.log("Body rendered")}

            </Link>
          )

        })}
      </div>
    </div>
  );
};

export default Body;
