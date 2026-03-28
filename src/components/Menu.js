import { useState, useCallback } from "react";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const Menu = () => {

    const {resId} = useParams();
    const { restaurant, categories, status, error, refetchMenu } = useRestaurantMenu(resId); // calling a custom hook

    const [showIndex, setShowIndex] = useState(null);
    const handleCategoryToggle = useCallback((index) => {
        setShowIndex((prevIndex) => (prevIndex === index ? null : index));
    }, []);

    if (status === "loading") {
        return <div className="menu"><h2>Loading menu...</h2></div>;
    }

    if (status === "failed") {
        return (
            <div className="menu">
                <div className="inline-feedback error-feedback" role="alert">
                    <h2>We could not load this menu.</h2>
                    <p>{error || "Please refresh this restaurant and try again."}</p>
                    <button className="primary-action" onClick={refetchMenu}>Retry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="menu">
            <h3 className = "menu-heading">{restaurant?.info?.name}</h3>

           {/* <ul>
            {restaurant?.info?.cuisines?.map((cuisine, index) => {
                return (
                    <li key={restaurant?.info?.id + index}>{cuisine}</li>
                )
            })}
           </ul> */}

            {categories?.map((category, index) => {
                return (
                    <RestaurantCategory key = {category?.card?.card?.title} 
                    data={category?.card?.card} 
                    showResItems = {(index === showIndex)} 
                    onToggle = {() => handleCategoryToggle(index)}
                    />
                )
            })}
        </div>  
    )
}

export default Menu;
