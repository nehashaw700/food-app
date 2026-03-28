import restaurantListData, { menuData } from "../utils/mockData";

export const getRestaurantList = async () => {
  return restaurantListData;
};

export const getRestaurantById = (resId) => {
  return restaurantListData.find((restaurant) => restaurant?.info?.id === resId) || null;
};

export const getMenuCategories = () => {
  return (
    menuData?.data?.cards?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (card) =>
        card?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || []
  );
};
