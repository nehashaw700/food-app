import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import ItemCard from "./ItemCard";
import EmptyState from "./EmptyState";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    }

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
                </div>
            )}
        </div>
    )
}

export default Cart;
