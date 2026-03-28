const RestaurantGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="skeleton-grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div className="skeleton-card" key={`restaurant-skeleton-${index}`}>
          <div className="skeleton-block skeleton-image"></div>
          <div className="skeleton-block skeleton-title"></div>
          <div className="skeleton-block skeleton-meta"></div>
          <div className="skeleton-block skeleton-meta short"></div>
        </div>
      ))}
    </div>
  );
};

const MenuSkeleton = ({ count = 4 }) => {
  return (
    <div className="menu-skeleton" aria-hidden="true">
      <div className="skeleton-block skeleton-menu-heading"></div>
      {Array.from({ length: count }).map((_, index) => (
        <div className="skeleton-category" key={`menu-skeleton-${index}`}>
          <div className="skeleton-block skeleton-category-title"></div>
          <div className="skeleton-block skeleton-category-subtitle"></div>
        </div>
      ))}
    </div>
  );
};

export { RestaurantGridSkeleton, MenuSkeleton };
