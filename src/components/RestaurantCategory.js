import { memo } from "react";
import ItemCard from "./ItemCard";

const RestaurantCategory = ({data, showResItems, onToggle}) => {

    return (
        <div className="res-category" onClick={onToggle}>
            <div className="res-category-title" >
                <span> <b>{data?.title} ({data?.itemCards.length}) </b></span>
                <span> {"-->"} </span>
            </div>

            {console.log("item cards: ", data?.itemCards)}
            {showResItems && <div className="res-category-items" >
                <ul>
                    {data?.itemCards.map((itemCard) => {
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
