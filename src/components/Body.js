import RestaurantCard from "./RestaurantCard";
import { useState, useEffect, useContext, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../utils/redux/restaurantSlice";
import { FixedSizeGrid as VirtualizedGrid } from "react-window";

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
      <div>
        <h1>You are Offline!</h1>
        <h2>Please check your internet Connection!!!</h2>
      </div>
    )
  }

  const { loggedInUser, setUserName } = useContext(UserContext);
  const handleSearchChange = useCallback((e) => {
    setSearchText(e.target.value);
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
        {status === "loading" && <h2>Loading restaurants...</h2>}
        {status === "failed" && <h2>{error}</h2>}

        {status === "succeeded" && (
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
      </div>
    </div>
  );
};

export default Body;
