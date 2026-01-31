import { useState } from "react";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { menuData } from "../utils/mockData";
import RestaurantCategory from "./RestaurantCategory";

const Menu = () => {

    const {resId} = useParams();
    const resInfo = useRestaurantMenu(resId); // calling a custom hook

    const [showIndex, setShowIndex] = useState(null);

    const categories = menuData?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c) => {
        return c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    });

    return (
        <div className="menu">
            <h3 className = "menu-heading">{resInfo[0]?.info?.name}</h3>

           {/* <ul>
            {resInfo[0]?.info?.cuisines?.map((cuisine, index) => {
                return (
                    <li key={resInfo[0]?.info?.id + index}>{cuisine}</li>
                )
            })}
           </ul> */}

            {categories?.map((category, index) => {
                return (
                    <RestaurantCategory key = {category?.card?.card?.title} 
                    data={category?.card?.card} 
                    showResItems = {(index === showIndex)} 
                    setShowIndex = {() => {
                       return setShowIndex(index);
                    }}
                    />
                )
            })}
        </div>  
    )
}

export default Menu;