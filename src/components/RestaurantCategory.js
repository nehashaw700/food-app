import { memo } from "react";
import ItemCard from "./ItemCard";

const RestaurantCategory = ({ data, showResItems, onToggle }) => {
    const itemCards = data?.itemCards || [];

    return (
        <div className="res-category" onClick={onToggle}>
            <div className="res-category-title" >
                <span> <b>{data?.title} ({itemCards.length}) </b></span>
                <span> {"-->"} </span>
            </div>

            {showResItems && <div className="res-category-items" >
                <ul>
                    {itemCards.map((itemCard) => {
                        return (
                            <li key = {itemCard?.card?.info?.id} >   
                            <ItemCard itemInfo={itemCard?.card?.info} />
                            </li>
                        )
                    })
                    }
                </ul>
            </div>}
        </div>
    )
}

export default memo(RestaurantCategory);
