import { useState } from "react";
import ItemCard from "./ItemCard";

const RestaurantCategory = ({data, showResItems, setShowIndex}) => {

    const [toggleResItems, setToggleResItems] = useState(false);

    const onCategoryClick = () => {
        setShowIndex();
        setToggleResItems(!toggleResItems);
    }

    return (
        <div className="res-category" onClick={onCategoryClick}>
            <div className="res-category-title" >
                <span> <b>{data?.title} ({data?.itemCards.length}) </b></span>
                <span> {"-->"} </span>
            </div>

            {console.log("item cards: ", data?.itemCards)}

            {showResItems && toggleResItems && <div className="res-category-items" >
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

export default RestaurantCategory;