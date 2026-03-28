import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantMenu } from "./redux/restaurantSlice";

const useRestaurantMenu = (resId) => {
    const dispatch = useDispatch();
    const menuState = useSelector((store) => store.restaurant.menuById[resId]);

    useEffect(() => {
        if (resId) {
            dispatch(fetchRestaurantMenu(resId));
        }
    }, [dispatch, resId]);

    const refetchMenu = () => {
        if (resId) {
            dispatch(fetchRestaurantMenu(resId));
        }
    };

    return {
        restaurant: menuState?.restaurant || null,
        categories: menuState?.categories || [],
        status: menuState?.status || "idle",
        error: menuState?.error || null,
        refetchMenu,
    };
}

export default useRestaurantMenu;
