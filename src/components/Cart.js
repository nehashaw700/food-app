import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/redux/cartSlice";
import ItemCard from "./ItemCard";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    return (
        <div>
            <button className="clear-cart"
                onClick={handleClearCart}>
                Clear Cart
            </button>

            {cartItems.length === 0 &&
                <div>
                    <h1>Your cart is empty!</h1>
                    <h2>Please add Items!!!</h2>
                </div>
            }
            
            {cartItems.map((item, index) => {
                return (
                    <li key={item.id + "" + index} >
                        <ItemCard itemInfo={item} />
                    </li>
                )
            })
            }
        </div>
    )
}

export default Cart;
