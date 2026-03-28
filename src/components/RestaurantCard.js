import { memo } from "react";

const RestaurantCard = (props) => {
  // this is called destructuring
  const { resName, cusines, time, rating, image } = props;

  return (
    <div className="res-card">
      <img
        className="res-logo"
        alt="res-img"
        src= {
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
          image
        }
      ></img>

      <div className = "resName"> {resName.length > 25 ? resName.slice(0, 25) + "...": resName}</div>

      <div className="ratingTime">
      <div> {rating} </div>
      <div> {time + ' - ' + (time + 10) + " mins"} </div>
      </div>
      
      <div className="res-cuisine"> {cusines.length > 20 ? cusines.slice(0, 20) + "...": cusines} </div>
      
    </div>
  );
};

export default memo(RestaurantCard);
