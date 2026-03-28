import { useState, useCallback } from "react";
import { useParams } from "react-router";
import useRestaurantMenu from "../hooks/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import useOnlineStatus from "../hooks/useOnlineStatus";
import { MenuSkeleton } from "./LoadingSkeleton";
import EmptyState from "./EmptyState";

const Menu = () => {

    const {resId} = useParams();
    const { restaurant, categories, status, error, refetchMenu } = useRestaurantMenu(resId); // calling a custom hook
    const onlineStatus = useOnlineStatus();

    const [showIndex, setShowIndex] = useState(null);
    const handleCategoryToggle = useCallback((index) => {
        setShowIndex((prevIndex) => (prevIndex === index ? null : index));
    }, []);

    if (onlineStatus === false) {
        return (
            <div className="menu">
                <EmptyState
                    title="Menu unavailable while offline"
                    description="Reconnect to load restaurant items, pricing, and availability."
                />
            </div>
        );
    }

    if (status === "loading") {
        return <div className="menu"><MenuSkeleton /></div>;
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

            {!categories?.length && (
                <EmptyState
                    title="No menu sections available"
                    description="This restaurant does not have menu categories to show right now."
                    actionLabel="Back to home"
                    actionTo="/"
                />
            )}

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
