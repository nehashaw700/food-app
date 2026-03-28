import RestaurantCard from "./RestaurantCard";
import { useState, useEffect, useMemo, useCallback, useContext, memo } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../hooks/useOnlineStatus";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../features/restaurant/restaurantSlice";
import { FixedSizeGrid as VirtualizedGrid } from "react-window";
import { RestaurantGridSkeleton } from "./LoadingSkeleton";
import UserContext from "../utils/UserContext";
import EmptyState from "./EmptyState";

const GRID_GAP = 30;
const DESKTOP_MAX_WIDTH = 1400;
const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1200;
const ROW_HEIGHT = 350;

const getViewportWidth = () => {
  if (typeof window === "undefined") {
    return DESKTOP_MAX_WIDTH;
  }

  return window.innerWidth;
};

const RestaurantGridCell = memo(({ columnIndex, rowIndex, style, data }) => {
  const { restaurants, columnCount } = data;
  const restaurantIndex = rowIndex * columnCount + columnIndex;
  const res = restaurants[restaurantIndex];

  if (!res) {
    return null;
  }

  return (
    <div style={{
      ...style,
      left: style.left + GRID_GAP / 2,
      top: style.top + GRID_GAP / 2,
      width: style.width - GRID_GAP,
      height: style.height - GRID_GAP,
    }}
    >
      <Link key={res.info.id} to={"/restaurants/" + res.info.id}>
        <RestaurantCard
          resName={res?.info.name}
          cusines={res?.info.cuisines.join(", ")}
          time={res?.info.sla.deliveryTime}
          rating={res?.info.avgRating}
          image={res?.info.cloudinaryImageId}
        />
      </Link>
    </div>
  );
});

const Body = () => {
  // useState is a react hook or state variable which has the power of keeping the data layer in sync with the ui layer
  // dont create state var in conditions/ functions -> if, for, 
  const [searchText, setSearchText] = useState("");
  const [viewportWidth, setViewportWidth] = useState(getViewportWidth);
  const dispatch = useDispatch();
  const { list: listOfRes, status, error } = useSelector((store) => store.restaurant);

  //it takes callback and dependency list as arg
  // called everytime comp render if no dep arr
  // if [], called once on the initial render
  // if [listOfRes], called everytime when listOfRes changes
  useEffect(() => {
    // const resData = await fetch(
    //   "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.40980&lng=77.31000&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    // );
    dispatch(fetchRestaurants());
    // called when unmounting the component
    return () => {

    }
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(getViewportWidth());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (
      <EmptyState
        title="You are offline right now"
        description="Reconnect to the internet to browse nearby restaurants and live menu details."
      />
    )
  }

   const { loggedInUser, setUserName } = useContext(UserContext);

  const handleSearchChange = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);
  const handleRetryRestaurants = useCallback(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);
  const handleClearSearch = useCallback(() => {
    setSearchText("");
  }, []);

  const filteredRestaurants = useMemo(() => {
    const normalizedSearchText = searchText.trim().toLowerCase();

    if (!normalizedSearchText) {
      return listOfRes;
    }

    return listOfRes.filter((res) =>
      res?.info?.name?.toLowerCase().includes(normalizedSearchText)
    );
  }, [listOfRes, searchText]);

  const columnCount = useMemo(() => {
    if (viewportWidth <= MOBILE_BREAKPOINT) {
      return 1;
    }

    if (viewportWidth <= TABLET_BREAKPOINT) {
      return 2;
    }

    return 4;
  }, [viewportWidth]);

  const gridWidth = useMemo(() => {
    const horizontalPadding = viewportWidth <= MOBILE_BREAKPOINT ? 30 : 60;
    return Math.min(DESKTOP_MAX_WIDTH, viewportWidth - horizontalPadding);
  }, [viewportWidth]);

  const columnWidth = useMemo(() => {
    return Math.floor(gridWidth / columnCount);
  }, [gridWidth, columnCount]);

  const rowCount = useMemo(() => {
    return Math.ceil(filteredRestaurants.length / columnCount);
  }, [filteredRestaurants.length, columnCount]);

  const gridHeight = useMemo(() => {
    const visibleRows = viewportWidth <= MOBILE_BREAKPOINT ? 2 : 2;
    return Math.min(rowCount, visibleRows) * ROW_HEIGHT;
  }, [rowCount, viewportWidth]);

  const gridData = useMemo(() => {
    return {
      restaurants: filteredRestaurants,
      columnCount,
    };
  }, [filteredRestaurants, columnCount]);

  return (
    <div className="body">
      <div className="search">
        <input className="search-input"
          placeholder="Enter a restaurant"
          value={searchText}
          onChange={handleSearchChange}></input>
      </div>

      {/* <div>
        <input value = {loggedInUser} onChange={(e) => setUserName(e.target.value)}>
        </input>
      </div> */}

      <div className="res-container">
        {/* Restaurant -> Img, res name, star rating, delivery time */}
        {status === "loading" && <RestaurantGridSkeleton />}
        {status === "failed" && (
          <div className="inline-feedback error-feedback" role="alert">
            <h2>We could not load restaurants.</h2>
            <p>{error || "Please try again in a moment."}</p>
            <button className="primary-action" onClick={handleRetryRestaurants}>
              Retry
            </button>
          </div>
        )}

        {status === "succeeded" && filteredRestaurants.length > 0 && (
          <div className="res-grid-shell">
            <VirtualizedGrid
              className="res-grid"
              columnCount={columnCount}
              columnWidth={columnWidth}
              height={gridHeight}
              rowCount={rowCount}
              rowHeight={ROW_HEIGHT}
              width={gridWidth}
              itemData={gridData}
            >
              {RestaurantGridCell}
            </VirtualizedGrid>
          </div>
        )}

        {status === "succeeded" && filteredRestaurants.length === 0 && (
          <div className="empty-state" role="status">
            <div className="empty-state-icon">🔎</div>
            <h2>No restaurants matched your search</h2>
            <p>
              We could not find anything for "{searchText}". Try a shorter or
              different restaurant name.
            </p>
            <button className="primary-action" onClick={handleClearSearch}>
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
