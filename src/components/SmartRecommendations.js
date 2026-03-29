import { Link } from "react-router-dom";
import { useMemo } from "react";
import { getSmartRecommendations } from "../services/recommendationService";

const SmartRecommendations = ({ cartItems, restaurants }) => {
  const recommendations = useMemo(() => {
    return getSmartRecommendations(cartItems, restaurants);
  }, [cartItems, restaurants]);

  if (!recommendations.length) {
    return null;
  }

  return (
    <section className="smart-picks">
      <div className="smart-picks-header">
        <p className="smart-picks-eyebrow">AI-Powered Picks</p>
        <h2>Recommended for your current cart</h2>
        <p>
          These suggestions are generated from the dish names and descriptions
          you have already added.
        </p>
      </div>

      <div className="smart-picks-grid">
        {recommendations.map((restaurant) => (
          <Link
            className="smart-pick-card"
            key={restaurant.id}
            to={`/restaurants/${restaurant.id}`}
          >
            <div className="smart-pick-badge">
              {restaurant.matchedCuisine || "Popular"}
            </div>
            <h3>{restaurant.name}</h3>
            <p className="smart-pick-meta">
              {restaurant.cuisines.join(", ")}
            </p>
            <p className="smart-pick-reason">{restaurant.reason}</p>
            <div className="smart-pick-footer">
              <span>{restaurant.rating} rating</span>
              <span>{restaurant.deliveryTime} mins</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SmartRecommendations;
