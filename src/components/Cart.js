import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { fetchRestaurants } from "../features/restaurant/restaurantSlice";
import ItemCard from "./ItemCard";
import EmptyState from "./EmptyState";
import SmartRecommendations from "./SmartRecommendations";
import { useEffect } from "react";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const restaurantList = useSelector((store) => store.restaurant.list);
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    useEffect(() => {
        if (cartItems.length > 0) {
            dispatch(fetchRestaurants());
        }
    }, [cartItems.length, dispatch]);

    return (
        <div className="cart-page">
            {cartItems.length > 0 && (
                <button className="clear-cart"
                    onClick={handleClearCart}>
                    Clear Cart
                </button>
            )}

            {cartItems.length === 0 &&
                <EmptyState
                    title="Your cart is feeling light"
                    description="Add a few dishes to place an order and see them listed here."
                    actionLabel="Browse restaurants"
                    actionTo="/"
                />
            }

            {cartItems.length > 0 && (
                <div className="cart-list">
                    {cartItems.map((item, index) => {
                        return (
                            <li key={item.id + "" + index} >
                                <ItemCard itemInfo={item} />
                            </li>
                        )
                    })}
                    <Link className="primary-action action-link cart-cta" to="/">
                        Add more items
                    </Link>
                    <SmartRecommendations
                        cartItems={cartItems}
                        restaurants={restaurantList}
                    />
                </div>
            )}
        </div>
    )
}

export default Cart;
