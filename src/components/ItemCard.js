import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { VegIcon, NonVegIcon } from "./VegNonVegIcon";
import { addItem } from "../features/cart/cartSlice";

const ItemCard = ({ itemInfo }) => {
    const dispatch = useDispatch();

    const handleAddItems = useCallback(() =>{
       dispatch(addItem(itemInfo));
    }, [dispatch, itemInfo]);

    return (
        <div className="item-card">
            <div className="item-info">
                {itemInfo.itemAttribute.vegClassifier === 'NONVEG' ? <NonVegIcon /> : <VegIcon />}
                <div className="item-name">{itemInfo.name}</div>

                <div className="item-details">
                    <div className="item-price">${itemInfo.price ? itemInfo.price / 100 : itemInfo.defaultPrice / 100}</div>
                    <div className="item-rating ">  ⭐ {itemInfo?.ratings?.aggregatedRating?.rating}</div>
                    <div className="item-desc "> {itemInfo?.description}</div>
                </div>
            </div>

            <div >
                <img className="item-image" src={
                    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
                    itemInfo.imageId
                }
                ></img>

                <div className="add-button">
                <button onClick={handleAddItems} >
                    ADD+
                </button>
                </div>
            </div>
        </div>
    )

}

export default memo(ItemCard);
