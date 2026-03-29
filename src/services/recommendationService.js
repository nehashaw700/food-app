const CUISINE_KEYWORDS = {
  Chinese: ["noodle", "manchurian", "fried rice", "schezwan", "dimsum", "momo", "wok"],
  Bakery: ["cake", "brownie", "pastry", "cookie", "muffin", "croissant"],
  Desserts: ["dessert", "ice cream", "chocolate", "sweet", "shake", "cheesecake"],
  Pizza: ["pizza", "margherita", "pepperoni"],
  Burgers: ["burger", "fries", "wrap", "sandwich"],
  Biryani: ["biryani", "kebab", "tandoori", "grill"],
  Indian: ["paneer", "dal", "thali", "curry", "roti", "paratha"],
};

const getCartText = (cartItems) => {
  return cartItems
    .map((item) => `${item?.name || ""} ${item?.description || ""}`.toLowerCase())
    .join(" ");
};

const getPreferenceScores = (cartItems) => {
  const cartText = getCartText(cartItems);

  return Object.entries(CUISINE_KEYWORDS).reduce((scores, [cuisine, keywords]) => {
    const score = keywords.reduce((total, keyword) => {
      return cartText.includes(keyword) ? total + 1 : total;
    }, 0);

    if (score > 0) {
      scores[cuisine] = score;
    }

    return scores;
  }, {});
};

export const getSmartRecommendations = (cartItems, restaurants) => {
  if (!cartItems.length || !restaurants.length) {
    return [];
  }

  const preferenceScores = getPreferenceScores(cartItems);
  const topCuisine = Object.entries(preferenceScores).sort((a, b) => b[1] - a[1])[0]?.[0];

  const rankedRestaurants = restaurants
    .map((restaurant) => {
      const cuisines = restaurant?.info?.cuisines || [];
      const matchedCuisine = cuisines.find((cuisine) => preferenceScores[cuisine]);

      return {
        restaurant,
        score: matchedCuisine ? preferenceScores[matchedCuisine] : 0,
        matchedCuisine,
      };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.restaurant?.info?.avgRating - a.restaurant?.info?.avgRating)
    .slice(0, 3)
    .map(({ restaurant, matchedCuisine }) => ({
      id: restaurant?.info?.id,
      name: restaurant?.info?.name,
      cuisines: restaurant?.info?.cuisines || [],
      rating: restaurant?.info?.avgRating,
      deliveryTime: restaurant?.info?.sla?.deliveryTime,
      matchedCuisine,
      reason: `Based on your cart, you seem to be in the mood for ${matchedCuisine}.`,
    }));

  if (rankedRestaurants.length > 0) {
    return rankedRestaurants;
  }

  if (!topCuisine) {
    return restaurants.slice(0, 3).map((restaurant) => ({
      id: restaurant?.info?.id,
      name: restaurant?.info?.name,
      cuisines: restaurant?.info?.cuisines || [],
      rating: restaurant?.info?.avgRating,
      deliveryTime: restaurant?.info?.sla?.deliveryTime,
      matchedCuisine: null,
      reason: "Popular nearby picks based on what customers often order together.",
    }));
  }

  return [];
};
